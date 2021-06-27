package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getImagesForRecipeQuery = `
SELECT image_id, recipe_id 
FROM recipe_image 
WHERE recipe_id=$1`

func GetImagesForRecipe(recipeId uuid.UUID) ([]tables.Image, error) {
	db := getDb()

	var recipeImages []*tables.RecipeImage
	err := pgxscan.Select(ctx, db, &recipeImages, getImagesForRecipeQuery, recipeId)
	if err != nil {
		return nil, err
	}

	var images []tables.Image
	if recipeImages != nil {
		for _, recImage := range recipeImages {
			img, err := GetImageById(recImage.ImageID)
			if err != nil {
				return nil, err
			}
			images = append(images, *img)
		}
	}

	return images, nil
}

var getMainImageForRecipeQuery = `
SELECT image_id, recipe_id 
FROM recipe_image 
WHERE recipe_id=$1
LIMIT 1`

func GetMainImageForRecipe(recipeId uuid.UUID) (*tables.Image, error) {
	db := getDb()

	var recipeImage tables.RecipeImage
	err := pgxscan.Get(ctx, db, &recipeImage, getMainImageForRecipeQuery, recipeId)

	if err != nil {
		return nil, err
	}

	img, err := GetImageById(recipeImage.ImageID)
	return img, err
}

var getRecipeImageQuery = `SELECT image_id, recipe_id FROM recipe_image WHERE recipe_id=$1 AND image_id=$2`

func GetRecipeImage(recipeId, imageId uuid.UUID) (*tables.RecipeImage, error) {
	db := getDb()

	var recipeImage tables.RecipeImage
	err := pgxscan.Get(ctx, db, &recipeImage, getRecipeImageQuery, recipeId, imageId)

	return &recipeImage, err
}
