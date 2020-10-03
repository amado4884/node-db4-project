exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ingredient")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ingredient").insert([
        { id: 1, name: "egg" },
        { id: 2, name: "cheese" },
        { id: 3, name: "steak" },
        { id: 4, name: "chicken" },
        { id: 5, name: "bread" },
      ]);
    });
};
