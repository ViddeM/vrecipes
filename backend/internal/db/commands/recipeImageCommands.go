package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateRecipeImage(recImg *tables.RecipeImage) error {
	db := getDB()
	tx := db.Create(recImg)
	return tx.Error
}

func DeleteRecipeImage(recipeImage *tables.RecipeImage) error {
	db := getDB()
	tx := db.Delete(recipeImage)
	return tx.Error
}