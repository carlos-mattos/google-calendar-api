import express from "express";
import { CreateCalendarEvent } from "./applications/GoogleCalendar/CreateCalendarEvent.js";
import { CALENDAR_ID, calendar, timeZone } from "./config/GoogleCalendar.js";

const router = express.Router();

const createCalendarEvent = new CreateCalendarEvent(CALENDAR_ID, calendar, timeZone);

router.post("/calendar", async (req, res) =>
  createCalendarEvent.execute(req, res)
);

export default router;
