package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeImageCommand = `
INSERT INTO recipe_image(recipe_id, image_id)
VALUES ($1, $2)
RETURNING recipe_id, image_id`

func CreateRecipeImage(recipeId, imageId uint64) (*tables.RecipeImage, error) {
	db := getDb()

	var recipeImage tables.RecipeImage
	err := pgxscan.Get(ctx, db, &recipeImage, createRecipeImageCommand, recipeId, imageId)
	return &recipeImage, err
}

var deleteRecipeImageCommand = `DELETE FROM recipe_image WHERE recipe_id=$1 AND image_id=$2`

func DeleteRecipeImage(recipeId, imageId uint64) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteRecipeImageCommand, recipeId, imageId)
	return err
}