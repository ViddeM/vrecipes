package queries

import (
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func GetImagesForRecipe(recipeId uint64) ([]tables.Image, error) {
	db := getDB()
	var recipeImages []tables.RecipeImage
	tx := db.Where(&tables.RecipeImage{
		RecipeID: recipeId,
	}, "recipeId").Find(&recipeImages)

	if tx.Error != nil {
		return nil, tx.Error
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

func GetMainImageForRecipe(recipeId uint64) (*tables.RecipeImage, error) {
	db := getDB()
	var recipeImage tables.RecipeImage
	tx := db.Where(&tables.RecipeImage{
		RecipeID: recipeId,
	}, "recipeId").First(&recipeImage)

	if tx.Error != nil {
		return &recipeImage, tx.Error
	}

	img, err := GetImageById(recipeImage.ImageID)
	if err == nil {
		recipeImage.Image = img
	}

	return &recipeImage, err
}