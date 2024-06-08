import { Request, Response } from "express";
import { Logger } from "./logging/logger";

const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  Logger.info("Server", `Server is running on http://localhost:${PORT}`);
});

app.get("/status", (_: Request, response: Response) => {
  const status: Object = {
    status: "Running",
  };

  Logger.info(
    "Server",
    `Request invoked at http://localhost:${PORT}/status endpoint`
  );

  response.send(status);
});
