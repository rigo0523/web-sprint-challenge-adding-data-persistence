exports.seed = async function (knex) {
  await knex("resources").insert([
    {
      resource_name: "Camping Tent",
      resource_description: "Tent used while hiking in yosemite national park",
    },
    {
      resource_name: "Laptop",
      resource_description:
        "In order to study CS at Lambda, I need to get a laptop",
    },
    {
      resource_name: "Condiments",
      resource_description:
        "In order to make a taco, we need to buy the ingredients",
    },
  ]);
};
