package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createUserCommand = `
INSERT INTO vrecipes_user(name, email, provider)
VALUES(					$1,   $2, 	 $3)
RETURNING id, name, email, provider`

func CreateUser(name, email, provider string) (*tables.User, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var user tables.User
	err = pgxscan.Get(ctx, db, &user, createUserCommand, name, email, provider)
	return &user, err
}