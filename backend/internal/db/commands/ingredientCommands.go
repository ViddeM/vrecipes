package commands

import "github.com/viddem/vrecipes/backend/internal/db/models"

func CreateIngredient(ingredient *models.Ingredient) error {
	db := getDB()
	tx := db.Create(ingredient)
	return tx.Error
}
