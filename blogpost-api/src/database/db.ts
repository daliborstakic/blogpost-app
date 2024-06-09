import sqlite3 from "sqlite3";
import { Logger } from "../logging/logger";

export function openDatabaseConnection() {
  const db = new sqlite3.Database("blogpost.db");

  db.serialize(() => {
    Logger.info("Database", "Connected to the database.");
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      age INTEGER
  )`,
    (err) => {
      if (err) {
        Logger.error("Database", "Error creating table.");
      } else {
        Logger.info("Database", 'Table "users" initialized successfully.');
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS blogposts (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        Logger.error("Database", "Error creating blogposts table.");
      } else {
        Logger.info("Database", 'Table "blogposts" initialized successfully.');
      }
    }
  );

  return db;
}

export function closeDatabaseConnection(db: sqlite3.Database) {
  db.close((err) => {
    if (err) {
      Logger.error("Database", "Error closing database:");
    } else {
      Logger.info("Database", "Database connection closed.");
    }
  });
}
