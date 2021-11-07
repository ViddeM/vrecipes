package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeStepCommand = `
INSERT INTO recipe_step(recipe_id, number, step)
VALUES 				   ($1, 	   $2, 	   $3)
RETURNING recipe_id, number, step
`

func CreateRecipeStep(
	recipeId uuid.UUID,
	number uint16,
	step string,
) (*tables.RecipeStep, error) {
	db := getDb()

	var recipeStep tables.RecipeStep
	err := pgxscan.Get(
		ctx,
		db,
		&recipeStep,
		createRecipeStepCommand,
		recipeId,
		number,
		step,
	)
	return &recipeStep, err
}

var updateRecipeStepCommand = `
UPDATE recipe_step
SET	step=$1
WHERE recipe_id=$2 AND number=$3
`

func UpdateRecipeStep(step string, recipeId uuid.UUID, number uint16) error {
	db := getDb()

	_, err := db.Exec(ctx, updateRecipeStepCommand, step, recipeId, number)
	return err
}

var deleteRecipeStepCommand = `
DELETE FROM recipe_step
WHERE recipe_id=$1 AND number=$2
`

func DeleteRecipeStep(recipeId uuid.UUID, number uint16) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteRecipeStepCommand, recipeId, number)
	return err
}
