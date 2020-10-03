const express = require("express");

const Recipes = require("./model.js");
const router = express.Router();

const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  try {
    const recipe = await Recipes.findById(id);
    if (!recipe)
      return res.status(400).json({ message: "No recipe found with that ID" });
    req.recipe = recipe;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

router.get("/", async (req, res) => {
  return res.status(200).json(await Recipes.find());
});

router.get("/:id", validateId, (req, res) => {
  return res.status(200).json(req.recipe);
});

router.get("/:id/instructions", validateId, async (req, res) => {
  try {
    const instructions = await Recipes.getRecipeInstructions(req.recipe.id);
    return res.status(200).json(instructions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.get("/:id/ingredients", validateId, async (req, res) => {
  try {
    const ingredients = await Recipes.getRecipeIngredients(req.recipe.id);
    return res.status(200).json(ingredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.post("/", (req, res) => {
  const schemeData = req.body;
});

router.put("/:id", validateId, (req, res) => {
  const { recipe } = req;
  const changes = req.body;
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.recipe;
  try {
    return res.status(200).json(await Recipes.remove(id));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
