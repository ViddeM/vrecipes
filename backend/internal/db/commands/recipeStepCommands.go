package commands

import "github.com/viddem/vrecipes/backend/internal/db/models"

func CreateRecipeStep(step *models.RecipeStep) error {
	db := getDB()
	tx := db.Create(step)
	return tx.Error
}