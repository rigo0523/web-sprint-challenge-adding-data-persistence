// build your `Task` model here
const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db("tasks");
}

function findById(id) {
  return db("tasks").where({ task_id: id }).first();
}

async function add(newPost) {
  return db("tasks")
    .insert(newPost, "id")
    .then((ids) => {
      console.log("ids---->", ids);
      return db("tasks").where({ task_id: ids }).first();
    });
}
