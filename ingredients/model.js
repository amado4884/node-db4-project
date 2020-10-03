const knex = require("knex");
const knexFile = require("../knexfile");
const devMode = process.env.ENV_MODE || "development";
const db = knex(knexFile[devMode]);

const recipesThatContainIngredient = async (id) => {
  return await db
    .select(`recipes.id`, `recipes.name`)
    .from(`ingredients`)
    .innerJoin(`ingredient`, `ingredients.ingredient_id`, `ingredient.id`)
    .innerJoin(`recipes`, `ingredients.recipe_id`, `recipes.id`)
    .where(`ingredient.name`, "=", "egg");
};

const findById = async (id) => {
  try {
    const s = await db("ingredients").where({ id }).first();
    if (!s) return null;
    return s;
  } catch (err) {
    return err;
  }
};

module.exports = {
  recipesThatContainIngredient,
  findById,
};
