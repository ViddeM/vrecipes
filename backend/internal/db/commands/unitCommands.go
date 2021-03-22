package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateUnit(unit *tables.Unit) error {
	db := getDB()
	tx := db.Create(unit)
	return tx.Error
}

