package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func GetOrCreateUser(name, email, provider string) (*tables.User, error) {
	user, err := queries.GetUserByEmail(email)
	if err == nil {
		return user, nil
	}

	if pgxscan.NotFound(err) == false {
		return nil, err
	}

	user, err = commands.CreateUser(name)
	if err != nil {
		return nil, err
	}

	_, err = commands.CreateUserEmail(user.ID, email, provider)
	return user, err
}
