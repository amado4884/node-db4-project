const express = require("express");
const server = express();

const RecipeRouter = require("./recipes/router");
const IngredientsRouter = require("./ingredients/router");

server.use(express.json());
server.use("/api/recipes", RecipeRouter);
server.use("/api/ingredients", IngredientsRouter);

module.exports = server;
