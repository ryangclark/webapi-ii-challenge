const express = require("express");

const server = express();

server.use(express.json());

const postsRouter = require("./posts/postsRouter.js");

server.get("/", (req, res) => {
  res.send(`
    <h1>ServerLand</h1>
    <p>Welcome to ServerLand!</p>
  `);
});

server.use("/api/posts", postsRouter);

server.listen(4000, () =>
  console.log(`\n** Server Running on on http://localhost:4000 **\n`)
);
