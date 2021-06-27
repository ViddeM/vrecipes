package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
)

var createImageCommand = `INSERT INTO image(name) VALUES ($1) RETURNING id`

func CreateImage(name string) (uuid.UUID, error) {
	db := getDb()

	var id uuid.UUID
	err := pgxscan.Get(ctx, db, &id, createImageCommand, name)

	return id, err
}
