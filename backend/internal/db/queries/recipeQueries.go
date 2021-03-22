package queries

import (
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func GetRecipeByName(uniqueName string) (*tables.Recipe, error) {
	db := getDB()
	var recipe tables.Recipe
	tx := db.Where(&tables.Recipe{
		UniqueName: uniqueName,
	}, "uniqueName").First(&recipe)
	return &recipe, tx.Error
}

func GetRecipeById(id uint64) (*tables.Recipe, error) {
	db := getDB()
	var recipe tables.Recipe
	tx := db.Where(&tables.Recipe{
		ID: id,
	}, "id").First(&recipe)
	return &recipe, tx.Error
}

func GetNonDeletedRecipes() ([]tables.Recipe, error) {
	db := getDB()
	var recipes []tables.Recipe
	tx := db.Where(map[string]interface{}{
		"deleted": false,
	}).Find(&recipes)
	return recipes, tx.Error
}