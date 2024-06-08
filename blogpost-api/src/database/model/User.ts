import sqlite3 from "sqlite3";

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
}

export class UserRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  public createUser(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO users (username, password, name, age) VALUES (?, ?, ?, ?)",
        [user.username, user.password, user.name, user.age],
        function (err: Error) {
          if (err) {
            reject(err);
            return;
          }

          resolve(this.lastID);
        }
      );
    });
  }

  public getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM users", (err: Error, rows: User[]) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows);
      });
    });
  }

  public getUserById(id: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err: Error, row: User) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(row);
        }
      );
    });
  }

  public getUserByUsername(username: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err: Error, row: User) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(row);
        }
      );
    });
  }
}
