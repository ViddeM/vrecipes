package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createUserCommand = `
INSERT INTO vrecipes_user(name)
VALUES(					  $1)
RETURNING id, name
`

func CreateUser(name string) (*tables.User, error) {
	db := getDb()

	var user tables.User
	err := pgxscan.Get(ctx, db, &user, createUserCommand, name)
	return &user, err
}
