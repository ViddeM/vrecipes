package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createIngredientCommand = `
INSERT INTO ingredient 
VALUES ($1)
RETURNING name
`

func CreateIngredient(name string) (*tables.Ingredient, error) {
	db := getDb()

	var ingredient tables.Ingredient
	err := pgxscan.Get(ctx, db, &ingredient, createIngredientCommand, name)
	return &ingredient, err
}