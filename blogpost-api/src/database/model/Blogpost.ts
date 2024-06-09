import sqlite3, { RunResult } from "sqlite3";

export interface Blogpost {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export class BlogpostRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  public createBlogpost(Blogpost: Blogpost): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO blogposts (title, content, userId) VALUES (?, ?, ?)",
        [Blogpost.title, Blogpost.content, Blogpost.userId],
        function (this: RunResult, err: Error) {
          if (err) {
            reject(err);
            return;
          }

          resolve(this.lastID);
        }
      );
    });
  }

  public getAllBlogpostsByUserId(userId: number): Promise<Blogpost[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT * FROM blogposts WHERE userId = ?",
        [userId],
        (err: Error, rows: Blogpost[]) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(rows);
        }
      );
    });
  }

  public getBlogpostById(id: number): Promise<Blogpost | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM blogposts WHERE id = ?",
        [id],
        (err: Error, row: Blogpost) => {
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
