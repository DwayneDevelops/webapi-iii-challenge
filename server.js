const express = require('express');
const helmet = require('helmet');

const server = express();
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

server.use(express.json(), helmet(), logger);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}' at '${Date.now()}`);
  next();
};

module.exports = server;
