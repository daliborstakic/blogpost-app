import { NextFunction, Request, Response } from "express";
import { Logger } from "./logging/logger";
import { User, UserRepository } from "./database/model/User";
import { openDatabaseConnection } from "./database/db";
import express from "express";
import { BlogpostLikes, BlogpostRepository } from "./database/model/Blogpost";
import { CommentRepository } from "./database/model/Comment";
import { LikeRepository } from "./database/model/Like";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = openDatabaseConnection();
const userRepository: UserRepository = new UserRepository(db);
const blogPostsRepository: BlogpostRepository = new BlogpostRepository(db);
const commentRepository: CommentRepository = new CommentRepository(db);
const likeRepository: LikeRepository = new LikeRepository(db);

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

app.get("/blogs", async (req: Request, res: Response) => {
  const blogPosts: BlogpostLikes[] =
    await blogPostsRepository.getBlogPostsWithLikes();

  if (blogPosts.length === 0) {
    res.statusCode = 404;
    res.json({ error: "There are no blog posts." });
  } else res.json(blogPosts);
});

app.get("/blogs/:userId", async (req: Request, res: Response) => {
  const blogPosts: BlogpostLikes[] =
    await blogPostsRepository.getAllBlogpostsByUserId(
      parseInt(req.params.userId)
    );

  if (blogPosts.length === 0) {
    res.statusCode = 404;
    res.json({ error: "User has no blog posts." });
  } else res.json(blogPosts);
});

app.get("/blogs-search/:query", async (req: Request, res: Response) => {
  try {
    const blogposts: BlogpostLikes[] =
      await blogPostsRepository.searchBlogposts(req.params.query);

    if (blogposts.length === 0) {
      res.statusCode = 404;
      res.status(200).json({ error: "There are no blog posts." });
    } else res.json(blogposts);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/blog", async (req: Request, res: Response) => {
  const blogPostId: number = await blogPostsRepository.createBlogpost(req.body);
  res.json(blogPostId);
});

app.get("/blog/:blogId", async (req: Request, res: Response) => {
  const blogPost: BlogpostLikes | undefined =
    await blogPostsRepository.getBlogpostById(parseInt(req.params.blogId));

  if (!blogPost) {
    res.statusCode = 404;
    res.json({ error: "No blog post with the given id." });
  } else res.json(blogPost);
});

app.post("/like", async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    await likeRepository.likePost(postId, userId);
    res.status(200).send("Post liked successfully.");
  } catch (err) {
    res.status(400).send("Unable to like post.");
  }
});

app.delete("/unlike", async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    await likeRepository.unlikePost(postId, userId);
    res.status(200).send("Post unliked successfully.");
  } catch (err) {
    res.status(400).send("Unable to unlike post.");
  }
});

app.post("/isLiked", async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    const liked = await likeRepository.isLiked(
      parseInt(postId),
      parseInt(userId)
    );
    res.status(200).json(liked);
  } catch (err) {
    res.status(400).send("Error checking like status.");
  }
});

app.get("/likesCount/:postId", async (req: Request, res: Response) => {
  try {
    const count = await likeRepository.getLikesCount(
      parseInt(req.params.postId)
    );
    res.status(200).json({ count });
  } catch (err) {
    res.status(400).send("Error fetching likes count.");
  }
});

app.post("/comment", async (req: Request, res: Response) => {
  try {
    const commentId = await commentRepository.addComment(req.body);
    res.json(commentId);
  } catch (err) {
    res.status(400).send("Unable to add comment.");
  }
});

app.get("/comments/:blogpostId", async (req: Request, res: Response) => {
  try {
    const comments = await commentRepository.getCommentsByPost(
      parseInt(req.params.blogpostId)
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).send("Error fetching comments.");
  }
});

app.delete("/comment/:id", async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.id, 10);
    if (isNaN(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID." });
    }

    const changes = await commentRepository.deleteComment(commentId);

    if (changes === 0) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res
      .status(200)
      .json({ message: "Comment deleted successfully.", commentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to delete comment." });
  }
});
