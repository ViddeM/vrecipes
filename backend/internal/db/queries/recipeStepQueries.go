package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getStepsForRecipeQuery = `SELECT recipe_id, number, step FROM recipe_step WHERE recipe_id=$1`

func GetStepsForRecipe(recipeId uint64) ([]*tables.RecipeStep, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var recipeSteps []*tables.RecipeStep
	err = pgxscan.Select(ctx, db, &recipeSteps, getStepsForRecipeQuery, recipeId)
	return recipeSteps, err
}
