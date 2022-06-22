package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

type AuthorsJson struct {
	Authors []tables.User `json:"authors"`
}

func GetAllAuthors() (*AuthorsJson, error) {
	authors, err := queries.GetAllUsersWithRecipe()
	if err != nil {
		return nil, err
	}

	if authors == nil {
		authors = make([]tables.User, 0)
	}

	return &AuthorsJson{Authors: authors}, nil
}
