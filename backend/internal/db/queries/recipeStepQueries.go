package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getStepsForRecipeQuery = `SELECT recipe_id, number, step FROM recipe_step WHERE recipe_id=$1`

func GetStepsForRecipe(recipeId uuid.UUID) ([]*tables.RecipeStep, error) {
	db := getDb()

	var recipeSteps []*tables.RecipeStep
	err := pgxscan.Select(ctx, db, &recipeSteps, getStepsForRecipeQuery, recipeId)
	return recipeSteps, err
}
