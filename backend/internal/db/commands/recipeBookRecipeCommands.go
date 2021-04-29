package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookRecipeCommand = `
INSERT INTO recipe_book_recipe(recipe_book_id, recipe_id)
					   VALUES ($1, 			   $2)
RETURNING recipe_book_id, recipe_id
`

func CreateRecipeBookRecipe(recipeBookId, recipeId uint64) (*tables.RecipeBookRecipe, error) {
	db := getDb()

	var recipeBookRecipe tables.RecipeBookRecipe
	err := pgxscan.Get(ctx, db, &recipeBookRecipe, createRecipeBookRecipeCommand, recipeBookId, recipeId)
	return &recipeBookRecipe, err
}