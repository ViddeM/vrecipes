package queries

import "github.com/viddem/vrecipes/backend/internal/db/models"

func GetStepsForRecipe(recipeId uint64) ([]models.RecipeStep, error) {
	db := getDB()
	var recipeSteps []models.RecipeStep
	tx := db.Where(&models.RecipeStep{
		RecipeID: recipeId,
	}, "recipeId").Find(&recipeSteps)
	return recipeSteps, tx.Error
}
