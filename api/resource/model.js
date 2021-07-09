// build your `Resource` model here
const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  add,
};
function find() {
  return db("resources");
}

function findById(id) {
  return db("resources").where({ resource_id: id }).first();
}

function add(resource) {
  return db("resources")
    .insert(resource, "id")
    .then((ids) => {
      return db("resources").where({ resource_id: ids }).first();
    });
}
