import sqlite3 from "sqlite3";

export interface Comment {
  id: number;
  blogpostId: number;
  userId: number;
  content: string;
  creationDate: string;
}

export class CommentRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  public addComment(
    blogpostId: number,
    userId: number,
    content: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO comments (blogpostId, userId, content) VALUES (?, ?, ?)`;
      this.db.run(
        query,
        [blogpostId, userId, content],
        function (err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public getCommentsByPost(blogpostId: number): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM comments WHERE blogpostId = ?`;
      this.db.all(query, [blogpostId], (err: Error | null, rows: Comment[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public deleteComment(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM comments WHERE id = ?`;
      this.db.run(query, [id], function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
