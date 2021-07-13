// build your `/api/projects` router here
const express = require("express");
const router = express.Router();

const ProjectModel = require("./model");

//GET /api/projects
router.get("/", (req, res, next) => {
  ProjectModel.find()
    .then((projects) => {
      projects.map((project) => {
        project.project_completed = Boolean(project.project_completed);
      });
      return res.status(200).json(projects);
    })
    .catch((err) => next(err));
});

//GET /api/projects/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

///THIS IS THE ENDPOINT FOR GETTING A LIST OF PROJECT RESOURCES COMBINED
//GET /api/projects/:id/resources
router.get("/:id/resources", async (req, res, next) => {
  const { id } = req.params;
  try {
    const projects = await ProjectModel.findProjectsResources(id);
    projects.map((projects) => {
      projects.project_completed = Boolean(projects.project_completed);
    });
    console.log("projects----->", projects);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

///POST /api/projects
router.post("/", (req, res, next) => {
  let projectPost = req.body;
  console.log("projectPost ----> ", Boolean(projectPost.project_completed));

  ProjectModel.add(projectPost)
    .then((project) => {
      project.project_completed = Boolean(project.project_completed);
      res.status(201).json(project);
    })
    .catch((err) => next(err));
});

//POST api/projects/:id/resources
router.post("/:id/resources", (req, res, next) => {
  const resource = {
    resource_name: req.body.resource_name,
    resource_description: req.body.resource_description,
  };

  ProjectModel.newResource(resource, req.params.id)
    .then((resource) => {
      console.log("-------------------->", resource);
      res.json(resource);
    })
    .catch((err) => next(err));
});

//GET api/projects/:id/tasks
router.get("/:id/tasks", (req, res, next) => {
  const { id } = req.params;
  ProjectModel.getTasks(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => next(err));
});

//POST /api/projects/:id/tasks
router.post("/:id/tasks", (req, res, next) => {
  const { id } = req.params;
  const taskPost = {
    task_description: req.body.task_description,
    task_notes: req.body.task_notes,
    task_completed: Boolean(req.body.task_completed),
    project_id: Number(id),
  };

  console.log("postTask----->", taskPost, id);
  ProjectModel.postTask(taskPost)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => next(err));
});

module.exports = router;
