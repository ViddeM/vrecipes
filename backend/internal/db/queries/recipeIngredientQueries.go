package queries

import "github.com/viddem/vrecipes/backend/internal/db/models"

func GetIngredientsForRecipe(recipeId uint64) ([]models.RecipeIngredient, error) {
	db := getDB()
	var recipeIngredients []models.RecipeIngredient
	tx := db.Where(&models.RecipeIngredient{
		RecipeID: recipeId,
	}, "recipeId").Find(&recipeIngredients)
	return recipeIngredients, tx.Error
}
