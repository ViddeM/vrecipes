package process

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
)

func GetFavoriteRecipesJson(id uuid.UUID) ([]uuid.UUID, error) {
	user, err := queries.GetUser(id)
	if err != nil {
		return nil, err
	}

	recipes, err := queries.GetFavoriteRecipesFromUser(user.ID)
	if err != nil {
		return nil, err
	}

	return recipes, nil
}
