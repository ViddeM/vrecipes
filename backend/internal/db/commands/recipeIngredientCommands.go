package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"log"
)

var createRecipeIngredientCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount, number, 			 is_heading)
SELECT 						  $1, 		 $2, 			  $3, 		 $4,	 COUNT(*) as number, false
FROM recipe_ingredient
WHERE recipe_id=$1
RETURNING id, recipe_id, ingredient_name, unit_name, amount, number, is_heading
`

func CreateRecipeIngredient(tx pgx.Tx, recipeId uuid.UUID, ingredientName, unitName string, amount float32) (*tables.RecipeIngredient, error) {
	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, tx, &recipeIngredient, createRecipeIngredientCommand, recipeId, ingredientName, unitName, amount)
	return &recipeIngredient, err
}

var createRecipeIngredientHeadingCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount, number, 			 is_heading)
SELECT						  $1,		 $2,			  '',		 0,		 COUNT(*) as number, true
FROM recipe_ingredient
WHERE recipe_id=$1
RETURNING id, recipe_id, ingredient_name, unit_name, amount, number, is_heading
`

func CreateRecipeIngredientHeading(tx pgx.Tx, recipeId uuid.UUID, ingredientName string) (*tables.RecipeIngredient, error) {
	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, tx, &recipeIngredient, createRecipeIngredientHeadingCommand, recipeId, ingredientName)
	return &recipeIngredient, err
}

var deleteRecipeIngredientCommand = `
DELETE 
FROM recipe_ingredient
WHERE id=$1 
`

func DeleteRecipeIngredient(tx pgx.Tx, id uuid.UUID) error {
	_, err := tx.Exec(ctx, deleteRecipeIngredientCommand, id)
	return err
}

var setRecipeIngredientsNumbersNegative = `
UPDATE recipe_ingredient
	SET number = -1 - number
WHERE recipe_id = $1
`

var setRecipeIngredientNumber = `
UPDATE recipe_ingredient
	SET number=$1
WHERE id=$2
`

func UpdateRecipeIngredientNumbers(tx pgx.Tx, idNumMap map[uuid.UUID]int, recipeId uuid.UUID) error {
	_, err := tx.Exec(ctx, setRecipeIngredientsNumbersNegative, recipeId)
	if err != nil {
		rollbackError := tx.Rollback(ctx)
		log.Printf("Failed to rollback transaction, err: %v", rollbackError)

		return err
	}

	for id, num := range idNumMap {
		_, err = tx.Exec(ctx, setRecipeIngredientNumber, num, id)
		if err != nil {
			rollbackError := tx.Rollback(ctx)
			log.Printf("Failed to rollback transaction, err: %v", rollbackError)

			return err
		}
	}

	return err
}
