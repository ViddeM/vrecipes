package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createTagCommand = `
INSERT INTO tag(name, description, color_red, color_green, color_blue)
		 VALUES($1,   $2,		   $3, 		  $4, 		   $5)
RETURNING id, description, color_red, color_green, color_blue
`

func CreateTag(name, description string, colorRed, colorGreen, colorBlue uint8) (*tables.Tag, error) {
	db := getDb()

	var tag tables.Tag
	err := pgxscan.Get(ctx, db, &tag, createTagCommand, name, description, colorRed, colorGreen, colorBlue)
	return &tag, err
}
