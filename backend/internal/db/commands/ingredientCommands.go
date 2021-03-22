package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateIngredient(ingredient *tables.Ingredient) error {
	db := getDB()
	tx := db.Create(ingredient)
	return tx.Error
}
