package queries

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func GetIngredientsForRecipe(recipeId uint64) ([]tables.RecipeIngredient, error) {
	db := getDB()
	var recipeIngredients []tables.RecipeIngredient
	tx := db.Where(&tables.RecipeIngredient{
		RecipeID: recipeId,
	}, "recipeId").Find(&recipeIngredients)
	return recipeIngredients, tx.Error
}
