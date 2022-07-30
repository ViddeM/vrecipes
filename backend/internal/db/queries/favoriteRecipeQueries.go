package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
)

var getFavoriteRecipesFromUserQuery = `
SELECT recipe_id 
FROM favorite_recipe
WHERE user_id=$1
`

func GetFavoriteRecipesFromUser(userId uuid.UUID) ([]uuid.UUID, error) {
	db := getDb()

	var tags []uuid.UUID
	err := pgxscan.Select(ctx, db, &tags, getTagsForRecipeQuery, userId)

	return tags, err
}
