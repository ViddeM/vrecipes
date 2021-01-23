package queries

import "github.com/viddem/vrecipes/backend/internal/db/models"

func GetUnit(name string) (*models.Unit, error) {
	db := getDB()
	var unit models.Unit
	tx := db.Where(&models.Unit{
		Name: name,
	}, "name").First(&unit)
	return &unit, tx.Error
}