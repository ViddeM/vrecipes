package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookRecipeCommand = `
INSERT INTO recipe_book_recipe(recipe_book_id, recipe_id)
					   VALUES ($1, 			   $2)
RETURNING recipe_book_id, recipe_id
`

func CreateRecipeBookRecipe(recipeBookId, recipeId uuid.UUID) (*tables.RecipeBookRecipe, error) {
	db := getDb()

	var recipeBookRecipe tables.RecipeBookRecipe
	err := pgxscan.Get(ctx, db, &recipeBookRecipe, createRecipeBookRecipeCommand, recipeBookId, recipeId)
	return &recipeBookRecipe, err
}

var deleteRecipeBookRecipeCommand = `
DELETE FROM recipe_book_recipe
WHERE recipe_book_id=$1 AND recipe_id=$2
`

func DeleteRecipeBookRecipe(recipeBookId, recipeId uuid.UUID) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteRecipeBookRecipeCommand, recipeBookId, recipeId)
	return err
}
