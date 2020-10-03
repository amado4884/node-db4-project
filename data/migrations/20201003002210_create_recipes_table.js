exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
    })
    .createTable("ingredient", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments();
      tbl.string("amount");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredient")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("instructions", (tbl) => {
      tbl.increments();
      tbl.string("step");
      tbl.string("instruction");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("ingredients")
    .dropTableIfExists("instructions")
    .dropTableIfExists("ingredient")
    .dropTableIfExists("recipes");
};
