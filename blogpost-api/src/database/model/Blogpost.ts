import sqlite3, { RunResult } from "sqlite3";

export interface BlogpostLikes {
  id: number;
  title: string;
  content: string;
  userId: number;
  likes: number;
  creationDate: string;
}

export class BlogpostRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  public createBlogpost(blogpost: BlogpostLikes): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO blogposts (title, content, userId) VALUES (?, ?, ?)",
        [blogpost.title, blogpost.content, blogpost.userId],
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

  public getBlogPostsWithLikes(): Promise<BlogpostLikes[]> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT blogposts.id, blogposts.title, blogposts.content, blogposts.userId, COUNT(likes.id) as likes
        FROM blogposts
        LEFT JOIN likes ON blogposts.id = likes.postId
        GROUP BY blogposts.id
      `;
      this.db.all(query, [], (err: Error, rows: BlogpostLikes[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public getAllBlogpostsByUserId(userId: number): Promise<BlogpostLikes[]> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT blogposts.id, blogposts.title, blogposts.content, blogposts.userId, COUNT(likes.id) as likes
        FROM blogposts
        LEFT JOIN likes ON blogposts.id = likes.postId
        WHERE blogposts.userId = ?
        GROUP BY blogposts.id
      `;
      this.db.all(query, [userId], (err: Error, rows: BlogpostLikes[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  public getBlogpostById(id: number): Promise<BlogpostLikes | undefined> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT blogposts.id, blogposts.title, blogposts.content, blogposts.userId, COUNT(likes.id) as likes
        FROM blogposts
        LEFT JOIN likes ON blogposts.id = likes.postId
        WHERE blogposts.id = ?
        GROUP BY blogposts.id
      `;
      this.db.get(query, [id], (err: Error, row: BlogpostLikes) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }
}
