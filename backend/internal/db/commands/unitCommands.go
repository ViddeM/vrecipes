package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

var createUnitCommand = `INSERT INTO unit VALUES($1)`

func CreateUnit(unit *tables.Unit) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, createUnitCommand, unit.Name)
	return err
}
