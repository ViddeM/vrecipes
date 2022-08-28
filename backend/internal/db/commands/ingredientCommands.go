package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createIngredientCommand = `
INSERT INTO ingredient 
VALUES ($1)
RETURNING name
`

func CreateIngredient(tx pgx.Tx, name string) (*tables.Ingredient, error) {
	var ingredient tables.Ingredient
	err := pgxscan.Get(ctx, tx, &ingredient, createIngredientCommand, name)
	return &ingredient, err
}
