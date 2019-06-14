const express = require('express');
const server = express();
const configureMiddleware = require('./middleware');
const projects = require('./routes/projects-router');
const actions = require('./routes/actions-router');

configureMiddleware(server);

server.get('/', (req, res) => {
    res.send(`<h2>HELLO THIS IS PATRICK</h2>`)
  });  

server.use("/api/projects", projects);
server.use("/api/actions", actions);

module.exports = server;