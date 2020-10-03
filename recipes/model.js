const knex = require("knex");
const knexFile = require("../knexfile");
const devMode = process.env.ENV_MODE || "development";
const db = knex(knexFile[devMode]);

const find = async () => {
  try {
    return await db("recipes");
  } catch (err) {
    return err;
  }
};

const findById = async (id) => {
  try {
    const s = await db("recipes").where({ id }).first();
    if (!s) return null;
    return s;
  } catch (err) {
    return err;
  }
};

const add = async (scheme) => {
  try {
    const s = await db("recipes").insert(scheme);
    return await db("recipes").where({ id: s[0] }).first();
  } catch (err) {
    return err;
  }
};

const update = async (changes, id) => {
  try {
    const s = await findById(id);
    await db("recipes").update(changes).where(s);
    return await db("recipes").where({ id }).first();
  } catch (err) {
    return err;
  }
};

const remove = async (id) => {
  try {
    await db("recipes").where({ id }).first().del();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getRecipeInstructions = async (id) => {
  try {
    return await db("recipes")
      .select(`step`, `instruction`)
      .from("instructions")
      .where({ recipe_id: id })
      .orderBy("step", "asc");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getRecipeIngredients = async (id) => {
  try {
    return await db("recipes")
      .select(`ingredients.amount`, `ingredient.name`)
      .from("ingredients")
      .innerJoin("ingredient", "ingredients.ingredient_id", "ingredient.id")
      .where({ recipe_id: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  getRecipeIngredients,
  getRecipeInstructions,
};
