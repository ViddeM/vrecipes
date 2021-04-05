package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getIngredientsForRecipeQuery = `SELECT id, recipe_id, ingredient_name, unit_name, amount FROM recipe_ingredient WHERE recipe_id=$1`

func GetIngredientsForRecipe(recipeId uint64) ([]*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredients []*tables.RecipeIngredient
	err := pgxscan.Select(ctx, db, &recipeIngredients, getIngredientsForRecipeQuery, recipeId)
	return recipeIngredients, err
}

var getRecipeIngredientByIdQuery = `SELECT id, recipe_id, ingredient_name, unit_name, amount FROM recipe_ingredient WHERE id=$1`

func GetRecipeIngredientQuery(id uint64) (*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, db, &recipeIngredient, getRecipeIngredientByIdQuery, id)
	return &recipeIngredient, err
}