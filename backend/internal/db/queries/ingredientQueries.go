package queries

import "github.com/viddem/vrecipes/backend/internal/db/models"

func GetIngredient(name string) (*models.Ingredient, error) {
	db := getDB()
	var ingredient models.Ingredient
	tx := db.Where(&models.Ingredient{
		Name: name,
	}, "name").First(&ingredient)
	return &ingredient, tx.Error
}