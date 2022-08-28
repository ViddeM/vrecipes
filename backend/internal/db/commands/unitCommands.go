package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createUnitCommand = `
INSERT INTO unit 
VALUES($1)
returning name
`

func CreateUnit(tx pgx.Tx, name string) (*tables.Unit, error) {
	var unit tables.Unit
	err := pgxscan.Get(ctx, tx, &unit, createUnitCommand, name)
	return &unit, err
}
