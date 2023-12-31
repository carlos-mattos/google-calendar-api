import express from "express";
import { CreateCalendarEvent } from "./applications/GoogleCalendar/CreateCalendarEvent.js";
import { oauth2Client, calendar } from "./config/GoogleCalendar.js";
import logger from "./config/Logger.js";

const router = express.Router();

router.post("/schedule", async (req, res) => {
  const createCalendarEvent = new CreateCalendarEvent(calendar, oauth2Client);
  createCalendarEvent.execute(req, res);
});

router.get("/login", async (req, res) => {
  const token = oauth2Client.credentials;
  if (Object.keys(token).length !== 0) {
    return res.send("Already authenticated!");
  }

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/calendar",
    login_hint: "coding.devzone@gmail.com",
  });

  logger.info("Redirecting");

  return res.redirect(url);
});

router.get("/google/redirect", async (req, res) => {
  const token = oauth2Client.credentials;
  if (token.access_token) {
    return res.send("Already authenticated!");
  }

  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  logger.info("Authenticating with code");

  return res.send("Authenticated! API is running...");
});

export default router;
