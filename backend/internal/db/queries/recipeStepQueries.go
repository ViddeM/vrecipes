package queries

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func GetStepsForRecipe(recipeId uint64) ([]tables.RecipeStep, error) {
	db := getDB()
	var recipeSteps []tables.RecipeStep
	tx := db.Where(&tables.RecipeStep{
		RecipeID: recipeId,
	}, "recipeId").Find(&recipeSteps)
	return recipeSteps, tx.Error
}
