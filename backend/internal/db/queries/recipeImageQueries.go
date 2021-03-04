package queries

import (
	"github.com/viddem/vrecipes/backend/internal/db/models"
)

func GetImagesForRecipe(recipeId uint64) ([]models.RecipeImage, error) {
	db := getDB()
	var recipeImages []models.RecipeImage
	tx := db.Where(&models.RecipeImage{
		RecipeID: recipeId,
	}, "recipeId").Find(&recipeImages)

	if recipeImages != nil {
		for _, recImage := range recipeImages {
			img, err := GetImageById(recImage.ImageID)
			if err != nil {
				return nil, err
			}

			recImage.Image = *img
		}
	}

	return recipeImages, tx.Error
}

func GetMainImageForRecipe(recipeId uint64) (*models.RecipeImage, error) {
	db := getDB()
	var recipeImage models.RecipeImage
	tx := db.Where(&models.RecipeImage{
		RecipeID: recipeId,
	}, "recipeId").First(&recipeImage)

	if tx.Error != nil {
		return &recipeImage, tx.Error
	}

	img, err := GetImageById(recipeImage.ImageID)
	if err == nil {
		recipeImage.Image = *img
	}

	return &recipeImage, err
}