const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  try {
    const recipe = await Recipes.findById(id);
    req.recipe = recipe;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  validateId,
};
