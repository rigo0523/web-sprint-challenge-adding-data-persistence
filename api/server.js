// build your server here...
const express = require("express");
const server = express();
const helmet = require("helmet");

///importing routers
const projectRouter = require("../api/project/router");
const resourceRouter = require("../api/resource/router");
const taskRouter = require("../api/task/router");

//global middleware
server.use(helmet());
server.use(express.json());

//GET /api/projects
server.use("/api/projects", projectRouter);
//GET /api/resources
server.use("/api/resources", resourceRouter);
//GET /api/tasks - includes all projects and resources combined
server.use("/api/tasks", taskRouter);

//Welcome Page
server.use("/", (req, res) => {
  res.json({ API: "Project Resources API is working - Enjoy!" });
});

//middleware for catch on routers
server.use((err, req, res) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

//export server to index.js ...
module.exports = server;
