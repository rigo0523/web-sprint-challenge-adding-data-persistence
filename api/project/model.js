// build your `Project` model here
const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  findProjectsResources,
  add,
  getTasks,
  newResource,
  postTask,
};

//GET /api/projects
function find() {
  return db("projects").select("*");
}

//GET /api/pojects/:id
function findById(id) {
  return db("projects").where({ project_id: id }).first();
}

//POST /api/projects
function add(project) {
  return db("projects")
    .insert(project, "id")
    .then((ids) => {
      return db("projects").where({ project_id: ids }).first();
    });
}

//GET /api/projects/:id/tasks
function getTasks(id) {
  return db("tasks")
    .join("projects", "projects.project_id", "tasks.project_id")
    .select("projects.*", "tasks.*")
    .where("tasks.project_id", id);
}

//POST /api/projects/:id/tasks
function postTask(data) {
  return db("tasks")
    .insert(data, "ids")
    .then((ids) => {
      return db("tasks").where("tasks.project_id", ids);
    });
}

//GET /api/pojects/:id/rersources --->
function findProjectsResources(id) {
  return db("project_resources")
    .join("projects", "projects.project_id", "project_resources.project_id")
    .join("resources", "resources.resource_id", "project_resources.resource_id")
    .select(
      "projects.project_id",
      "projects.project_name",
      "projects.project_description",
      "project_resources.resource_id",
      "projects.project_completed",
      "resources.resource_name",
      "resources.resource_description"
    )
    .where("projects.project_id", id);
}

//POST /api/projects/:id/resources
function newResource(data, projectID) {
  return db("resources")
    .insert(data)
    .then((ids) => {
      console.log(ids, "ids----->", "projectID---->", projectID);
      return db("project_resources").insert({
        resource_id: ids,
        project_id: projectID,
      });
    });
}
