package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookImageCommand = `
INSERT INTO recipe_book_image(recipe_book_id, image_id)
					  VALUES ($1, 			  $2)
RETURNING recipe_book_id, image_id
`

func CreateRecipeBookImage(recipeBookId, imageId uint64) (*tables.RecipeBookImage, error) {
	db := getDb()

	var recipeBookImage tables.RecipeBookImage
	err := pgxscan.Get(ctx, db, &recipeBookImage, createRecipeBookImageCommand, recipeBookId, imageId)
	return &recipeBookImage, err
}

var deleteRecipeBookImageCommand = `
DELETE FROM recipe_book_image
WHERE recipe_book_id=$1 AND image_id=$2
`

func DeleteRecipeBookImage(bookId, imageId uint64) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteRecipeBookImageCommand, bookId, imageId)
	return err
}