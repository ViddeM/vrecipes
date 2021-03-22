package queries

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func GetUnit(name string) (*tables.Unit, error) {
	db := getDB()
	var unit tables.Unit
	tx := db.Where(&tables.Unit{
		Name: name,
	}, "name").First(&unit)
	return &unit, tx.Error
}