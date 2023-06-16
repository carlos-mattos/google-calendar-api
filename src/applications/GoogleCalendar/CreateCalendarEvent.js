import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

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

      if (req.body.start && req.body.end) {
        const { start, end } = req.body;

        const [startDay, startMonth, startYear] = start.date
          .split("/")
          .map((num) => parseInt(num, 10));
        const [startHour, startMinute] = start.time
          .split(":")
          .map((num) => parseInt(num, 10));
        const [endDay, endMonth, endYear] = end.date
          .split("/")
          .map((num) => parseInt(num, 10));
        const [endHour, endMinute] = end.time
          .split(":")
          .map((num) => parseInt(num, 10));

        resource = {
          ...resource,
          start: {
            dateTime: dayjs()
              .year(startYear)
              .month(startMonth - 1)
              .date(startDay)
              .hour(startHour)
              .minute(startMinute)
              .toISOString(),
            timeZone: this.TIMEZONE,
          },
          end: {
            dateTime: dayjs()
              .year(endYear)
              .month(endMonth - 1)
              .date(endDay)
              .hour(endHour)
              .minute(endMinute)
              .toISOString(),
            timeZone: this.TIMEZONE,
          },
        };
      }

      if (req.body.attendees) {
        resource = { ...resource, attendees: req.body.attendees };
      }

      await this.calendar.events.insert({
        calendarId: "primary",
        auth: this.oauth2Client,
        requestBody: resource,
        conferenceDataVersion: 1,
      });

      return res.status(200).json({ message: "Evento criado com sucesso" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Erro ao criar evento" });
    }
  }
}
