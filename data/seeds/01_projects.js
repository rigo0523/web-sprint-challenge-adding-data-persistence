exports.seed = async function (knex) {
  await knex("projects").insert([
    {
      project_name: "Yosemite Hike",
      project_description: "Beautiful scenery and lots of mountains",
      project_completed: true,
    },
    {
      project_name: "Study Computer Science",
      project_description: "Currently learning CS at Lambda School",
      project_completed: false,
    },
    {
      project_name: "Make Tacos",
      project_description: "Add cilantro, steak, onion, lime to a tortilla",
      project_completed: true,
    },
  ]);
};
