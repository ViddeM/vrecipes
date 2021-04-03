package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeIngredientCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount)
VALUES 						 ($1,		 $2,			  $3,		 $4)
RETURNING id, recipe_id, ingredient_name, unit_name, amount
`

func CreateRecipeIngredient(recipeId uint64, ingredientName, unitName string, amount float32) (*tables.RecipeIngredient, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var recipeIngredient tables.RecipeIngredient
	err = pgxscan.Get(ctx, db, &recipeIngredient, createRecipeIngredientCommand, recipeId, ingredientName, unitName, amount)
	return &recipeIngredient, err
}

var deleteRecipeIngredientCommand = `
DELETE FROM recipe_ingredient
WHERE id=$1 
`

func DeleteRecipeIngredient(id uint64) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, deleteRecipeIngredientCommand, id)
	return err
}