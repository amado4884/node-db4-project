exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ingredients").insert([
        { id: 1, amount: "2", ingredient_id: 1, recipe_id: 1 },
        { id: 2, amount: "1 cup", ingredient_id: 2, recipe_id: 1 },
        { id: 3, amount: "1 package", ingredient_id: 3, recipe_id: 2 },
        { id: 4, amount: "2", ingredient_id: 1, recipe_id: 3 },
      ]);
    });
};
