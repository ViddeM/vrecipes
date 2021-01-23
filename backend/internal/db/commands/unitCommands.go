package commands

import "github.com/viddem/vrecipes/backend/internal/db/models"

func CreateUnit(unit *models.Unit) error {
	db := getDB()
	tx := db.Create(unit)
	return tx.Error
}

