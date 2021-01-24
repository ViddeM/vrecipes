package commands

import "github.com/viddem/vrecipes/backend/internal/db/models"

func CreateRecipeImage(recImg *models.RecipeImage) error {
	db := getDB()
	tx := db.Create(recImg)
	return tx.Error
}
