package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getUserByIdQuery = `SELECT id, name, email, provider FROM public.user WHERE id=$1`

func GetUser(id uint64) (*tables.User, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var user tables.User
	err = pgxscan.Get(ctx, db, &user, getUserByIdQuery, id)
	return &user, err
}

var getUserByEmailQuery = `SELECT id, name, email, provider FROM public.user WHERE email=$1`

func GetUserByEmail(email string) (*tables.User, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var user tables.User
	err = pgxscan.Get(ctx, db, &user, getUserByEmailQuery, email)
	return &user, err
}