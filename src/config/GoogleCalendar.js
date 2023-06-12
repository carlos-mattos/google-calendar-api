import { google } from "googleapis";
import "dotenv/config";

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CALENDAR_API_CREDENTIALS);
const CALENDAR_ID = process.env.CALENDAR_ID;

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  ["https://www.googleapis.com/auth/calendar"]
);

const calendar = google.calendar({ version: "v3", auth });

const timeZone = "America/Sao_Paulo";

export { calendar, CALENDAR_ID, timeZone };
