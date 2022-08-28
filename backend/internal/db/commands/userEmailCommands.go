package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createUserEmailCommand = `
INSERT INTO user_email(user_id, email, provider)
VALUES(				   $1,		$2,	   $3)
RETURNING user_id, email, provider
`

func CreateUserEmail(tx pgx.Tx, userId uuid.UUID, email, provider string) (*tables.UserEmail, error) {
	var userEmail tables.UserEmail
	err := pgxscan.Get(ctx, tx, &userEmail, createUserEmailCommand, userId, email, provider)
	return &userEmail, err
}
