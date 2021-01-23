package queries

import (
	"github.com/viddem/vrecipes/backend/internal/db/models"
)

func GetRecipeByName(uniqueName string) (*models.Recipe, error) {
	db := getDB()
	var recipe models.Recipe
	tx := db.Where(&models.Recipe{
		UniqueName: uniqueName,
	}, "uniqueName").First(&recipe)
	return &recipe, tx.Error
}

func GetRecipeById(id uint64) (*models.Recipe, error) {
	db := getDB()
	var recipe models.Recipe
	tx := db.Where(&models.Recipe{
		ID: id,
	}, "id").First(&recipe)
	return &recipe, tx.Error
}