package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getRecipeByNameQuery = `SELECT id, name, unique_name, description, oven_temp, estimated_time, deleted, created_by
FROM recipe
WHERE unique_name=$1`

func GetRecipeByName(uniqueName string) (*tables.Recipe, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}

	var recipe tables.Recipe
	err = pgxscan.Get(ctx, db, &recipe, getRecipeByNameQuery, uniqueName)
	return &recipe, err
}

var getRecipeByIdQuery = `SELECT id, name, unique_name, description, oven_temp, estimated_time, deleted, created_by
FROM recipe
WHERE id=$1`

func GetRecipeById(id uint64) (*tables.Recipe, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var recipe tables.Recipe
	err = pgxscan.Get(ctx, db, &recipe, getRecipeByIdQuery, id)
	return &recipe, err
}

var getNonDeletedRecipesQuery = `SELECT id, name, unique_name, description, oven_temp, estimated_time, deleted, created_by
FROM recipe
WHERE deleted=false`

func GetNonDeletedRecipes() ([]*tables.Recipe, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var recipes []*tables.Recipe
	err = pgxscan.Select(ctx, db, &recipes, getNonDeletedRecipesQuery)

	return recipes, err
}