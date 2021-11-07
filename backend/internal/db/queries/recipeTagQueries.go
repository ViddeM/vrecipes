package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var countRecipesWithTagQuery = `
SELECT COUNT(*)
FROM recipe_tag JOIN recipe ON recipe_tag.recipe_id = recipe.id
WHERE tag_id=$1
`

func CountRecipesWithTag(tagId *uuid.UUID) (uint64, error) {
	db := getDb()

	var count uint64
	err := pgxscan.Get(ctx, db, &count, countRecipesWithTagQuery, tagId)

	return count, err
}

var getTagsForRecipeQuery = `
SELECT * 
FROM recipe_tag
WHERE recipe_id=$1
`

func GetTagsForRecipe(recipeId *uuid.UUID) ([]*tables.RecipeTag, error) {
	db := getDb()

	var tags []*tables.RecipeTag
	err := pgxscan.Select(ctx, db, &tags, getTagsForRecipeQuery, recipeId)

	return tags, err
}
