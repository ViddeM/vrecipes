package queries

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func GetIngredient(name string) (*tables.Ingredient, error) {
	db := getDB()
	var ingredient tables.Ingredient
	tx := db.Where(&tables.Ingredient{
		Name: name,
	}, "name").First(&ingredient)
	return &ingredient, tx.Error
}