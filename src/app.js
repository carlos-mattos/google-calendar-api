import express from "express";
import "dotenv/config";
import Router from "./routes.js";
import open from "open";
import logger from "./config/Logger.js";

const app = express();
app.use(express.json());
app.use(Router);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
  open(`http://localhost:${port}/login`);
});

export default server;
