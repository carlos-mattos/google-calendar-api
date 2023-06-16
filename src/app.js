import express from "express";
import "dotenv/config";
import Router from "./routes.js";
import open from "open";

const app = express();
app.use(express.json());
app.use(Router);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  open(`http://localhost:${port}/login`);
});

export default server;
