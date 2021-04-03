package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

var createRecipeStepCommand = `
INSERT INTO recipe_step
VALUES ($1, $2, $3)
`

func CreateRecipeStep(step *tables.RecipeStep) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, createRecipeStepCommand, step.RecipeID, step.Number, step.Step)
	return err
}

var updateRecipeStepCommand = `
UPDATE recipe_step
SET	step=$1
WHERE recipe_id=$2 AND number=$3
`

func UpdateRecipeStep(step *tables.RecipeStep) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, updateRecipeStepCommand, step.Step, step.RecipeID, step.Number)
	return err
}

var deleteRecipeStepCommand = `
DELETE FROM recipe_step
WHERE recipe_id=$1 AND number=$2
`

func DeleteRecipeStep(step *tables.RecipeStep) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, deleteRecipeStepCommand, step.RecipeID, step.Number)
	return err
}