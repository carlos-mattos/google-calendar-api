import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import logger from "../../config/Logger.js";

export class CreateCalendarEvent {
  TIMEZONE = "America/Sao_Paulo";

  constructor(calendar, oauth2Client) {
    this.calendar = calendar;
    this.oauth2Client = oauth2Client;
  }

  async execute(req, res) {
    try {
      const { summary, description } = req.body;

      if (!summary || !description)
        return res.status(400).json({ message: "Dados inválidos" });

      let resource = {
        summary,
        description,
        conferenceData: {
          createRequest: {
            requestId: randomUUID(),
          },
        },
      };

      if (req.body.start && req.body.duration) {
        const { start, duration } = req.body;

        const [date, time] = start.split(" ");
        const [startDay, startMonth, startYear] = date
          .split("-")
          .map((num) => parseInt(num, 10));
        const [startHour, startMinute] = time
          .split(":")
          .map((num) => parseInt(num, 10));

        const startDateTime = dayjs()
          .year(startYear)
          .month(startMonth - 1)
          .date(startDay)
          .hour(startHour)
          .minute(startMinute);

        resource = {
          ...resource,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: this.TIMEZONE,
          },
          end: {
            dateTime: dayjs(startDateTime).add(duration, "hour").toISOString(),
            timeZone: this.TIMEZONE,
          },
        };
      }

      if (req.body.attendees) {
        const attendees = req.body.attendees.split(",").map((email) => ({
          email: email.trim(),
        }));

        resource = { ...resource, attendees: attendees };
      }

      await this.calendar.events.insert({
        calendarId: "primary",
        auth: this.oauth2Client,
        requestBody: resource,
        conferenceDataVersion: 1,
      });

      logger.info("Evento criado com sucesso", resource.summary);

      return res
        .status(200)
        .json({ message: "Evento criado com sucesso", resource });
    } catch (error) {
      logger.error("Erro ao criar evento", error.toString());

      return res.status(500).json({ message: "Erro ao criar evento" });
    }
  }
}
