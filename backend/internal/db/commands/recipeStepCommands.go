package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeStepCommand = `
INSERT INTO recipe_step(recipe_id, number, step, is_heading)
VALUES 				   ($1, 	   $2, 	   $3,   $4)
RETURNING recipe_id, number, step, is_heading
`

func CreateRecipeStep(
	recipeId uuid.UUID,
	number uint16,
	step string,
	isHeading bool,
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
		isHeading,
	)
	return &recipeStep, err
}

var updateRecipeStepCommand = `
UPDATE recipe_step
SET	step=$1, 
	is_heading=$2
WHERE recipe_id=$3 AND number=$4
`

func UpdateRecipeStep(step string, recipeId uuid.UUID, number uint16, isHeading bool) error {
	db := getDb()

	_, err := db.Exec(ctx, updateRecipeStepCommand, step, isHeading, recipeId, number)
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
