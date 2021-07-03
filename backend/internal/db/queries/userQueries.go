package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getUserByIdQuery = `
SELECT id, name
FROM vrecipes_user 
WHERE id=$1`

func GetUser(id uuid.UUID) (*tables.User, error) {
	db := getDb()

	var user tables.User
	err := pgxscan.Get(ctx, db, &user, getUserByIdQuery, id)
	return &user, err
}

var getUserByEmailQuery = `
SELECT id, name
FROM vrecipes_user
INNER JOIN user_email ON user_email.user_id=vrecipes_user.id
WHERE email=$1;
`

func GetUserByEmail(email string) (*tables.User, error) {
	db := getDb()

	var user tables.User
	err := pgxscan.Get(ctx, db, &user, getUserByEmailQuery, email)
	return &user, err
}
