exports.up = async function (knex) {
  await knex.schema.createTable("projects", (tbl) => {
    tbl.increments("project_id");
    tbl.string("project_name", 128).notNullable().unique();
    tbl.string("project_description", 300);
    tbl.boolean("project_completed").notNullable().defaultTo(false);
  });

  await knex.schema.createTable("resources", (tbl) => {
    tbl.increments("resource_id");
    tbl.string("resource_name", 128).notNullable().unique();
    tbl.string("resource_description", 300);
  });

  await knex.schema.createTable("tasks", (tbl) => {
    tbl.increments("task_id");
    tbl.string("task_description", 300).notNullable();
    tbl.string("task_notes", 300);
    tbl.boolean("task_completed").notNullable().defaultTo(false);
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("projects.project_id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  //GET api/pojects/:id/resources
  await knex.schema.createTable("project_resources", (tbl) => {
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("projects.project_id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("resource_id")
      .unsigned()
      .notNullable()
      .references("resources.resource_id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.primary(["project_id", "resource_id"]);
  });
};

//rollback
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
