package commands

import (
	"github.com/viddem/vrecipes/backend/internal/db/models"
)

func CreateRecipe(recipe *models.Recipe) (uint64, error) {
	db := getDB()
	recipe.ID = 0 // Make sure that the ID follows the serial numbering
	tx := db.Create(recipe)
	return recipe.ID, tx.Error
}