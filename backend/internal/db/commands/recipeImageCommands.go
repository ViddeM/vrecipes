package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

var createRecipeImageCommand = `INSERT INTO recipe_image VALUES ($1, $2)`

func CreateRecipeImage(recImg *tables.RecipeImage) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, createRecipeImageCommand, recImg.RecipeID, recImg.ImageID)
	return err
}

var deleteRecipeImageCommand = `DELETE FROM recipe_image WHERE recipe_id=$1 AND image_id=$2`

func DeleteRecipeImage(recipeImage *tables.RecipeImage) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, deleteRecipeImageCommand, recipeImage.RecipeID, recipeImage.ImageID)
	return err
}