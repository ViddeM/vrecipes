package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookImageCommand = `
INSERT INTO recipe_book_image(recipe_book_id, image_id)
					  VALUES ($1, 			  $2)
RETURNING recipe_book_id, image_id
`

func CreateRecipeBookImage(tx pgx.Tx, recipeBookId, imageId uuid.UUID) (*tables.RecipeBookImage, error) {
	var recipeBookImage tables.RecipeBookImage
	err := pgxscan.Get(ctx, tx, &recipeBookImage, createRecipeBookImageCommand, recipeBookId, imageId)
	return &recipeBookImage, err
}

var deleteRecipeBookImageCommand = `
DELETE FROM recipe_book_image
WHERE recipe_book_id=$1 AND image_id=$2
`

func DeleteRecipeBookImage(tx pgx.Tx, bookId, imageId uuid.UUID) error {
	_, err := tx.Exec(ctx, deleteRecipeBookImageCommand, bookId, imageId)
	return err
}
