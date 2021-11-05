package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getTagByNameQuery = `
SELECT id, name, description, color_red, color_green, color_blue
FROM tag
WHERE name=$1
`

func GetTagByName(name string) (*tables.Tag, error) {
	db := getDb()

	var tag tables.Tag
	err := pgxscan.Get(ctx, db, &tag, getTagByNameQuery, name)
	return &tag, err
}
