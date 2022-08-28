package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createUserCommand = `
INSERT INTO vrecipes_user(name)
VALUES(					  $1)
RETURNING id, name
`

func CreateUser(tx pgx.Tx, name string) (*tables.User, error) {
	var user tables.User
	err := pgxscan.Get(ctx, tx, &user, createUserCommand, name)
	return &user, err
}
