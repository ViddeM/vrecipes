package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeImageCommand = `
INSERT INTO recipe_image(recipe_id, image_id)
VALUES 					($1, 		$2)
RETURNING recipe_id, image_id`

func CreateRecipeImage(tx pgx.Tx, recipeId, imageId uuid.UUID) (
	*tables.RecipeImage,
	error,
) {
	var recipeImage tables.RecipeImage
	err := pgxscan.Get(
		ctx,
		tx,
		&recipeImage,
		createRecipeImageCommand,
		recipeId,
		imageId,
	)
	return &recipeImage, err
}

var deleteRecipeImageCommand = `
DELETE FROM recipe_image 
WHERE recipe_id=$1 AND image_id=$2`

func DeleteRecipeImage(tx pgx.Tx, recipeId, imageId uuid.UUID) error {
	_, err := tx.Exec(ctx, deleteRecipeImageCommand, recipeId, imageId)
	return err
}
