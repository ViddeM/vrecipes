package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createImageCommand = `INSERT INTO image(name) VALUES ($1) RETURNING id`

func CreateImage(image *tables.Image) (uint64, error) {
	db, err := getDb()
	if err != nil {
		return 0, err
	}
	defer db.Release()

	var id uint64
	err = pgxscan.Get(ctx, db, &id, createImageCommand, image.Name)

	return id, err
}