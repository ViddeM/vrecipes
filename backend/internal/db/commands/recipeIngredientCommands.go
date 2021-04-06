package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeIngredientCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount, number)
VALUES 						 ($1,		 $2,			  $3,		 $4,     $5)
RETURNING id, recipe_id, ingredient_name, unit_name, amount, number
`

func CreateRecipeIngredient(recipeId uint64, ingredientName, unitName string, amount float32, number int) (*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, db, &recipeIngredient, createRecipeIngredientCommand, recipeId, ingredientName, unitName, amount, number)
	return &recipeIngredient, err
}

var deleteRecipeIngredientCommand = `
DELETE 
FROM recipe_ingredient
WHERE id=$1 
`

func DeleteRecipeIngredient(id uint64) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteRecipeIngredientCommand, id)
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

func UpdateRecipeIngredientNumbers(idNumMap map[uint64]int, recipeId uint64) error {
	db := getDb()
	tx, err := db.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	_, err = tx.Exec(ctx, setRecipeIngredientsNumbersNegative, recipeId)
	if err != nil {
		return err
	}

	for id, num := range idNumMap {
		_, err = tx.Exec(ctx, setRecipeIngredientNumber, num, id)
		if err != nil {
			return err
		}
	}

	err = tx.Commit(ctx)
	return err
}