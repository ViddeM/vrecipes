package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createUserCommand = `
INSERT INTO public.user(name, email, provider)
VALUES(					$1,   $2, 	 $3)
RETURNING id`

func CreateUser(user *tables.User) (uint64, error) {
	db, err := getDb()
	if err != nil {
		return 0, err
	}
	defer db.Release()

	var id uint64
	err = pgxscan.Get(ctx, db, &id, createUserCommand, user.Name, user.Email, user.Provider)
	return id, err
}