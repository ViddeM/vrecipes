package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getEmailsForUserQuery = `
SELECT user_id, email, provider
FROM user_email
WHERE user_id=$1
`;

func GetEmailsForUser(id uint64) ([]*tables.UserEmail, error) {
	db, err := getDb()
	if err != nil {
		return nil, err
	}
	defer db.Release()

	var emails []*tables.UserEmail
	err = pgxscan.Select(ctx, db, &emails, getEmailsForUserQuery, id)
	return emails, err
}