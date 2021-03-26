package process

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"gorm.io/gorm"
)

func GetOrCreateUser(name, email string) (*tables.User, error) {
	user, err := queries.GetUserByEmail(email)
	if err == nil {
		return user, nil
	}

	if errors.Is(err, gorm.ErrRecordNotFound) == false{
		return nil, err
	}

	user = &tables.User{
		Name:  name,
		Email: email,
	}

	err = commands.CreateUser(user)
	return user, err
}
