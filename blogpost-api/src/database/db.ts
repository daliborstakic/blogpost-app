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
      creationDate TEXT NOT NULL DEFAULT (datetime('now')),
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

  db.run(
    `CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY,
      blogpostId INTEGER,
      userId INTEGER,
      content TEXT NOT NULL,
      creationDate TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (blogpostId) REFERENCES blogposts(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        Logger.error("Database", "Error creating comments table.");
      } else {
        Logger.info("Database", 'Table "comments" initialized successfully.');
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (postId) REFERENCES blogposts(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    UNIQUE (postId, userId)
  )`,
    (err) => {
      if (err) {
        Logger.error("Database", "Error creating likes table.");
      } else {
        Logger.info("Database", 'Table "likes" initialized successfully.');
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
