package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getIngredientsForRecipeQuery = `
SELECT id, recipe_id, ingredient_name, unit_name, amount, number, is_heading
FROM recipe_ingredient 
WHERE recipe_id=$1
ORDER BY number
`

func GetIngredientsForRecipe(recipeId uuid.UUID) ([]*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredients []*tables.RecipeIngredient
	err := pgxscan.Select(ctx, db, &recipeIngredients, getIngredientsForRecipeQuery, recipeId)
	return recipeIngredients, err
}

var getRecipeIngredientByIdQuery = `
SELECT id, recipe_id, ingredient_name, unit_name, amount, number, is_heading
FROM recipe_ingredient 
WHERE id=$1`

func GetRecipeIngredientQuery(id uuid.UUID) (*tables.RecipeIngredient, error) {
	db := getDb()

	var recipeIngredient tables.RecipeIngredient
	err := pgxscan.Get(ctx, db, &recipeIngredient, getRecipeIngredientByIdQuery, id)
	return &recipeIngredient, err
}

var getNumberOfRecipeIngredientsQuery = `
SELECT COUNT(*)
FROM recipe_ingredient
WHERE recipe_id=$1
`

func GetNumberOfIngredientsForRecipe(recipeId uuid.UUID) (int, error) {
	db := getDb()

	var ingredientCount int
	err := pgxscan.Get(ctx, db, &ingredientCount, getNumberOfRecipeIngredientsQuery, recipeId)
	return ingredientCount, err
}
