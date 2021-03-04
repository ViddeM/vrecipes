package queries

import "github.com/viddem/vrecipes/backend/internal/db/models"

func GetImageById(id uint64) (*models.Image, error) {
	db := getDB()
	var image models.Image
	tx := db.First(&image, id)
	return &image, tx.Error
}