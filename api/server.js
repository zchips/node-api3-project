const express = require('express');

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use(express.json());

const usersRouter = require('./users/users-router');
const {logger, validateUserId, validateUser, validatePost, notFound, errorhandling, } = require('./middleware/middleware');

server.use("/", logger);
server.use('/api/users', usersRouter);

server.get("/", logger, (req, res, next) =>{
  res.send(`<h2>Let's write some middleware!</h2>`);
})

server.use('*', notFound);

// server.use(errorHandling)

// server.get('/', (req, res) => {});

module.exports = server;
