package commands

import "github.com/viddem/vrecipes/backend/internal/db/models"

func CreateRecipeIngredient(ingredient *models.RecipeIngredient) error {
	db := getDB()
	tx := db.Create(ingredient)
	return tx.Error
}
