import { google } from "googleapis";
import "dotenv/config";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY,
});

export { oauth2Client, calendar };
