package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateImage(image *tables.Image) (uint64, error) {
	db := getDB()
	image.ID = 0
	tx := db.Create(image)
	return image.ID, tx.Error
}
