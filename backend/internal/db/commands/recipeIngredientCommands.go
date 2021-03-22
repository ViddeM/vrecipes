package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateRecipeIngredient(ingredient *tables.RecipeIngredient) error {
	db := getDB()
	tx := db.Create(ingredient)
	return tx.Error
}

func DeleteRecipeIngredient(ingredient *tables.RecipeIngredient) error {
	db := getDB()
	tx := db.Delete(ingredient)
	return tx.Error
}