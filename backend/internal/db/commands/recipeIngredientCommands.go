package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

var createRecipeIngredientCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount)
VALUES 						 ($1,		 $2,			  $3,		 $4)
`

func CreateRecipeIngredient(ingredient *tables.RecipeIngredient) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, createRecipeIngredientCommand, ingredient.RecipeID,
		ingredient. IngredientName, ingredient.UnitName, ingredient.Amount)
	return err
}

var deleteRecipeIngredientCommand = `
DELETE FROM recipe_ingredient
WHERE id=$1 
`

func DeleteRecipeIngredient(ingredient *tables.RecipeIngredient) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, deleteRecipeIngredientCommand, ingredient.ID)
	return err
}