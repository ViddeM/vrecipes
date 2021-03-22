package commands

import (
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func CreateRecipe(recipe *tables.Recipe) (uint64, error) {
	db := getDB()
	recipe.ID = 0 // Make sure that the ID follows the serial numbering
	tx := db.Create(recipe)
	return recipe.ID, tx.Error
}

func EditRecipe(recipe *tables.Recipe) error {
	db := getDB()
	tx := db.Save(recipe)
	return tx.Error
}