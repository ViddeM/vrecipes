package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeIngredientCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount, number, 			 is_heading)
SELECT 						  $1, 		 $2, 			  $3, 		 $4,	 COUNT(*) as number, false
FROM recipe_ingredient
WHERE recipe_id=$1
RETURNING id, recipe_id, ingredient_name, unit_name, amount, number, is_heading
`

func CreateRecipeIngredient(recipeId uuid.UUID, ingredientName, unitName string, amount float32) (*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, db, &recipeIngredient, createRecipeIngredientCommand, recipeId, ingredientName, unitName, amount)
	return &recipeIngredient, err
}

var createRecipeIngredientHeadingCommand = `
INSERT INTO recipe_ingredient(recipe_id, ingredient_name, unit_name, amount, number, 			 is_heading)
SELECT						  $1,		 $2,			  '',		 0,		 COUNT(*) as number, true
FROM recipe_ingredient
WHERE recipe_id=$1
RETURNING id, recipe_id, ingredient_name, unit_name, amount, number, is_heading
`

func CreateRecipeIngredientHeading(recipeId uuid.UUID, ingredientName string) (*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, db, &recipeIngredient, createRecipeIngredientHeadingCommand, recipeId, ingredientName)
	return &recipeIngredient, err
}

var deleteRecipeIngredientCommand = `
DELETE 
FROM recipe_ingredient
WHERE id=$1 
`

func DeleteRecipeIngredient(id uuid.UUID) error {
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

func UpdateRecipeIngredientNumbers(idNumMap map[uuid.UUID]int, recipeId uuid.UUID) error {
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
