package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getIngredientByNameQuery = `SELECT name FROM ingredient WHERE name=$1`

func GetIngredient(name string) (*tables.Ingredient, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var ingredient tables.Ingredient
	err = pgxscan.Get(ctx, db, &ingredient, getIngredientByNameQuery, name)
	return &ingredient, err
}