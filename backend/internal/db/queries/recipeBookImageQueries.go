package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getImageForRecipeBookQuery = `
SELECT image_id, recipe_book_id 
FROM recipe_book_image
WHERE recipe_book_id=$1
`

func GetImageForRecipeBook(recipeBookId uint64) (*tables.Image, error) {
	db := getDb()

	var recipeBookImage tables.RecipeBookImage
	err := pgxscan.Get(ctx, db, &recipeBookImage, getImageForRecipeBookQuery, recipeBookId)

	if err != nil {
		return nil, err
	}

	img, err := GetImageById(recipeBookImage.ImageId)
	return img, err
}