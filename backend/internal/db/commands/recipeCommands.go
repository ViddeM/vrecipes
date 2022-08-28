package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeCommand = `
INSERT INTO recipe(name, unique_name, description, oven_temp, estimated_time, deleted, created_by, portions, portions_suffix)
		   VALUES ($1,   $2,          $3,          $4,        $5,             $6,	   $7,         $8,       $9)
RETURNING id, name, unique_name, description, oven_temp, estimated_time, deleted, created_by, portions, portions_suffix`

func CreateRecipe(tx pgx.Tx, name, uniqueName, description, portionsSuffix string, ovenTemp, estimatedTime, portions int, createdBy uuid.UUID) (*tables.Recipe, error) {
	var recipe tables.Recipe
	err := pgxscan.Get(ctx, tx, &recipe, createRecipeCommand, name, uniqueName, description, ovenTemp, estimatedTime, false, createdBy, portions, portionsSuffix)
	return &recipe, err
}

var updateRecipeCommand = `
UPDATE recipe 
SET name=$1,
	unique_name=$2,
	description=$3,
	oven_temp=$4,
	estimated_time=$5,
	portions=$6,
	portions_suffix=$7
WHERE id=$8
`

func UpdateRecipe(tx pgx.Tx, name, uniqueName, description string, ovenTemp, estimatedTime, portions int, portionsSuffix string, recipeId uuid.UUID) error {
	_, err := tx.Exec(ctx, updateRecipeCommand, name, uniqueName, description,
		ovenTemp, estimatedTime, portions, portionsSuffix, recipeId)
	return err
}

var recipeSetDeletedCommand = `
UPDATE recipe
SET deleted=true,
	name=$1,
	unique_name=$2
WHERE id=$3
`

func RecipeSetDeleted(tx pgx.Tx, name, uniqueName string, id uuid.UUID) error {
	_, err := tx.Exec(ctx, recipeSetDeletedCommand, name, uniqueName, id)
	return err
}
