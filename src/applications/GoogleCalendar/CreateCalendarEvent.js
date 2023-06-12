import { dateTimeForCalendar } from "../../utils/dateTimeForCalendar.js";

export class CreateCalendarEvent {
  constructor(CALENDAR_ID, calendar, timeZone) {
    this.CALENDAR_ID = CALENDAR_ID;
    this.calendar = calendar;
    this.timeZone = timeZone;
  }

  async execute(req, res) {
    try {
      const body = req.body;

      const { start, end } = dateTimeForCalendar({
        endDate: body.end.date,
        endDateTime: body.end.time,
        startDate: body.start.date,
        startDateTime: body.start.time,
      });

      const response = await this.calendar.events.insert({
        calendarId: this.CALENDAR_ID,
        resource: {
          summary: body.summary,
          description: body.description,
          start: {
            dateTime: start,
            timeZone: this.timeZone,
          },
          end: {
            dateTime: end,
            timeZone: this.timeZone,
          },
          attendees: body.attendees,
        },
      });

      return res.status(200).json({ message: "Evento criado com sucesso" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Erro ao criar evento" });
    }
  }
}
