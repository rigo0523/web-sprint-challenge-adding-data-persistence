exports.seed = async function (knex) {
  await knex("tasks").insert([
    {
      task_description: "Plan a flight to California",
      task_notes: "Need to save money to buy a tent, ticket, rent car",
      task_completed: true,
      project_id: 1,
    },
    {
      task_description: "Graduate Lambda and get a web dev job",
      task_notes: "Need to study every night and submit every project on time",
      task_completed: false,
      project_id: 2,
    },
    {
      task_description: "Make tacos for Cinco De Mayo",
      task_notes: "Need to make sure the tacos are made 5 De Mayo",
      task_completed: true,
      project_id: 3,
    },
  ]);
};
