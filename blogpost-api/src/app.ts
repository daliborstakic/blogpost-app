import { NextFunction, Request, Response } from "express";
import { Logger } from "./logging/logger";
import { User, UserRepository } from "./database/model/User";
import { openDatabaseConnection } from "./database/db";
import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = openDatabaseConnection();
const userRepository: UserRepository = new UserRepository(db);

app.listen(PORT, () => {
  Logger.info("Server", `Server is running on http://localhost:${PORT}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  Logger.info("Server", `Request: ${req.method}, ${req.url}`);

  next();
});

app.get("/status", (_: Request, response: Response) => {
  const status: Object = {
    status: "Running",
  };

  response.json(status);
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const user: User | undefined = await userRepository.getUserById(
    parseInt(req.params.id)
  );

  if (!user) {
    res.statusCode = 404;
    res.json({ error: "No user with the given id. " });
  } else res.json(user);
});

app.get("/users", async (_: Request, res: Response) => {
  const users: User[] = await userRepository.getAllUsers();
  res.json(users);
});

app.post("/user", async (req: Request, res: Response) => {
  const user: number = await userRepository.createUser(req.body);
  res.json(user);
});

app.get("/users/:username", async (req: Request, res: Response) => {
  const user: User | undefined = await userRepository.getUserByUsername(
    req.params.username
  );

  if (!user) {
    res.statusCode = 404;
    res.json({ error: "No user with the given username. " });
  } else res.json(user);
});
