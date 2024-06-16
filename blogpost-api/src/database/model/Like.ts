import sqlite3 from "sqlite3";

export interface Like {
  id: number;
  postId: number;
  userId: number;
}

export class LikeRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  public likePost(postId: number, userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO likes (postId, userId) VALUES (?, ?)`;
      this.db.run(query, [postId, userId], function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  public unlikePost(postId: number, userId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM likes WHERE postId = ? AND userId = ?`;
      this.db.run(query, [postId, userId], function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public isLiked(postId: number, userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) as count FROM likes WHERE postId = ? AND userId = ?`;
      this.db.get(
        query,
        [postId, userId],
        (err: Error | null, row: { count: number }) => {
          if (err) {
            reject(err);
          } else {
            resolve(row.count > 0);
          }
        }
      );
    });
  }

  public getLikesCount(postId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) as count FROM likes WHERE postId = ?`;
      this.db.get(
        query,
        [postId],
        (err: Error | null, row: { count: number }) => {
          if (err) {
            reject(err);
          } else {
            resolve(row.count);
          }
        }
      );
    });
  }
}
