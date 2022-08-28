package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func GetOrCreateUser(name, email, provider string) (*tables.User, error) {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return nil, err
	}
	defer commands.RollbackTransaction(tx)

	user, err := queries.GetUserByEmail(email)
	if err == nil {
		return user, nil
	}

	if pgxscan.NotFound(err) == false {
		return nil, err
	}

	user, err = commands.CreateUser(tx, name)
	if err != nil {
		return nil, err
	}

	_, err = commands.CreateUserEmail(tx, user.ID, email, provider)
	if err != nil {
		return nil, err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return nil, err
	}

	return user, nil
}
