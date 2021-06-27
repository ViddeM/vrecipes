package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getImageByIdQuery = `SELECT id, name FROM image WHERE id=$1`

func GetImageById(id uuid.UUID) (*tables.Image, error) {
	db := getDb()

	var image tables.Image
	err := pgxscan.Get(ctx, db, &image, getImageByIdQuery, id)
	return &image, err
}
