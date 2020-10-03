const express = require("express");

const Ingredients = require("./model.js");
const router = express.Router();

const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  try {
    const ingredient = await Ingredients.findById(id);
    if (!ingredient)
      return res
        .status(400)
        .json({ message: "No ingredient found with that ID" });
    req.ingredient = ingredient;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

router.get("/:id/recipes", validateId, async (req, res) => {
  try {
    const recipes = await Ingredients.recipesThatContainIngredient(
      req.ingredient.id
    );
    return res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
