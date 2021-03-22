package queries

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func GetImageById(id uint64) (*tables.Image, error) {
	db := getDB()
	var image tables.Image
	tx := db.First(&image, id)
	return &image, tx.Error
}