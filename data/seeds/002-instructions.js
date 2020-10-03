exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instructions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("instructions").insert([
        { id: 1, step: 1, instruction: "Crack open eggs", recipe_id: 1 },
        { id: 2, step: 2, instruction: "Scrable eggs", recipe_id: 1 },
        { id: 3, step: 3, instruction: "Put pan on high heat", recipe_id: 1 },
        {
          id: 4,
          step: 4,
          instruction:
            "Cook eggs in pan, mixing to prevent the eggs from sticking to the pan.",
          recipe_id: 1,
        },
        { id: 5, step: 5, instruction: "Add cheese, and enjoy!", recipe_id: 1 },
        { id: 6, step: 1, instruction: "Marinate steak", recipe_id: 2 },
        { id: 7, step: 2, instruction: "Cook steak", recipe_id: 2 },
        { id: 8, step: 3, instruction: "Eat it!", recipe_id: 2 },
        { id: 9, step: 1, instruction: "Fry the damn egg.", recipe_id: 3 },
      ]);
    });
};
