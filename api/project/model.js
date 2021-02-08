// build your `Project` model here
const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  findProjectsResources,
  add,
};
function find() {
  return db("projects").select(
    "project_id",
    "project_name",
    "project_description",
    "project_completed"
  );
}

function findById(id) {
  return db("projects").where({ id }).first();
}

function findProjectsResources(id) {
  return db("projects_resources")
    .select(
      "projects.id as project_ID",
      "projects.project_name",
      "projects.description as project_description",
      "projects_resources.resource_id",
      "resources.resource_name as resource_name",
      "resources.description as resource_description",
      "tasks.description as task_description",
      "tasks.notes as task_notes",
      "projects.completed"
    )
    .join("projects", "projects.id", "=", "projects_resources.project_id")
    .join("resources", "resources.id", "=", "projects_resources.resource_id")
    .join("tasks", "tasks.project_id", "=", "projects.id")
    .where("projects.id", id);
}

function add(project) {
  return db("projects")
    .insert(project, "id")
    .then((ids) => {
      return db("projects").where({ project_id: ids }).first();
    });
}
