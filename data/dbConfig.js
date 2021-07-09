const knex = require("knex");
const configKnexFile = require("../knexfile");

// Complete your db configuration using the `environment` variable.
const environment = process.env.NODE_ENV || "development";

module.exports = knex(configKnexFile[environment]);
