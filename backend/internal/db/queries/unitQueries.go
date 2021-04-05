package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getUnitQuery = `SELECT name FROM unit WHERE name=$1`

func GetUnit(name string) (*tables.Unit, error) {
	db := getDb()

	var unit tables.Unit
	err := pgxscan.Get(ctx, db, &unit, getUnitQuery, name)
	return &unit, err
}