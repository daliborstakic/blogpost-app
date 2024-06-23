# Blog Application

This project is a full-stack application that allows users to create blogs, comment on them, and like them. The front-end is built using Angular, and the back-end is developed with Express.js.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login, logout)
- Create, read, blogs
- Comment on blogs and delete comments
- Like and unlike blogs
- Responsive design

## Technologies Used

- **Front-end:**

  - Angular
  - Angular Material
  - Bootstrap
  - PopperJS
  - JQuery
  - TypeScript

- **Back-end:**
  - Express.js
  - Node.js
  - SQLite3

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI (v12 or later)
- SQlite3
- tsc (Typescript compiler)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/daliborstakic/blogpost-app.git
   cd blogpost-app
   ```

2. **Install dependencies for both front-end and back-end**

   ```sh
   cd blogpost-front
   npm install

   cd blogpost-api
   npm install
   ```

### Running the Application

1. **Start the back-end server**

   ```sh
   cd blogpost-api
   ts-node src/app.ts
   ```

   The server will be started at `localhost:3000`

2. **Start the front-end server**

   ```sh
   cd blogpost-front
   ng serve
   ```

   The front-end server will be running at `localhost:4200`

## API Documentation

### Status

- `GET /status`
  - Returns the status of the server.

### User Routes

- `GET /user/:id`

  - Retrieves a user by their ID.

- `GET /users`

  - Retrieves all users.

- `POST /user`

  - Creates a new user.

- `GET /users/:username`
  - Retrieves a user by their username.

### Blog Routes

- `GET /blogs`

  - Retrieves all blog posts with likes.

- `GET /blogs/:userId`

  - Retrieves all blog posts by a specific user ID.

- `GET /blogs-search/:query`

  - Searches for blog posts based on a query.

- `POST /blog`

  - Creates a new blog post.

- `GET /blog/:blogId`
  - Retrieves a blog post by its ID.

### Like Routes

- `POST /like`

  - Likes a blog post.

- `DELETE /unlike`

  - Unlikes a blog post.

- `POST /isLiked`

  - Checks if a blog post is liked by a user.

- `GET /likesCount/:postId`
  - Retrieves the count of likes for a blog post.

### Comment Routes

- `POST /comment`

  - Adds a comment to a blog post.

- `GET /comments/:blogpostId`

  - Retrieves comments for a specific blog post.

- `DELETE /comment/:id`
  - Deletes a comment by its ID.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

### Fork the repository

    * Create a new branch (git checkout -b feature-branch)
    * Commit your changes (git commit -m 'Add some feature')
    * Push to the branch (git push origin feature-branch)
    * Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
