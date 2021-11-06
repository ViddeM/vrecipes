package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
)

var countRecipesWithTag = `
SELECT COUNT(*)
FROM recipe_tag JOIN recipe ON recipe_tag.recipe_id = recipe.id
WHERE tag_id=$1 AND recipe.deleted=false
`

func CountRecipesWithTag(tagId *uuid.UUID) (uint64, error) {
	db := getDb()

	var count uint64
	err := pgxscan.Get(ctx, db, &count, countRecipesWithTag, tagId)

	return count, err
}
