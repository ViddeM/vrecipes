package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
)

var createImageCommand = `INSERT INTO image(name) VALUES ($1) RETURNING id`

func CreateImage(tx pgx.Tx, name string) (uuid.UUID, error) {
	var id uuid.UUID
	err := pgxscan.Get(ctx, tx, &id, createImageCommand, name)

	return id, err
}
