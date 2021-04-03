package queries

import (
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/georgysavva/scany/pgxscan"
)

var getImageByIdQuery = `SELECT id, name FROM image WHERE id=$1`

func GetImageById(id uint64) (*tables.Image, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var image tables.Image
	err = pgxscan.Get(ctx, db, &image, getImageByIdQuery, id)
	return &image, err
}