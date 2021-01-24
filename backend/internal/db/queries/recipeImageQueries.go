package queries

import "github.com/viddem/vrecipes/backend/internal/db/models"

func GetImagesForRecipe(recipeId uint64) ([]models.RecipeImage, error) {
	db := getDB()
	var recipeImages []models.RecipeImage
	tx := db.Where(&models.RecipeImage{
		RecipeID: recipeId,
	}, "recipeId").First(&recipeImages)
	return recipeImages, tx.Error
}
