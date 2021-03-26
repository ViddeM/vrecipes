package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateRecipeStep(step *tables.RecipeStep) error {
	db := getDB()
	tx := db.Create(step)
	return tx.Error
}

func UpdateRecipeStep(step *tables.RecipeStep) error {
	db := getDB()
	tx := db.Model(&step).Where("recipe_id = ? AND number = ?", step.RecipeID, step.Number).Updates(step)
	return tx.Error
}

func DeleteRecipeStep(step *tables.RecipeStep) error {
	db := getDB()
	tx := db.Delete(step)
	return tx.Error
}