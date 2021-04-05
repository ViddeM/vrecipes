package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getIngredientByNameQuery = `SELECT name FROM ingredient WHERE name=$1`

func GetIngredient(name string) (*tables.Ingredient, error) {
	db := getDb()

	var ingredient tables.Ingredient
	err := pgxscan.Get(ctx, db, &ingredient, getIngredientByNameQuery, name)
	return &ingredient, err
}
