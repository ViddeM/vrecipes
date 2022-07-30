package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createFavoriteRecipeCommand = `
INSERT INTO favorite_recipe(recipe_id, user_id)
VALUES				  ($1,		  $2)
RETURNING recipe_id, user)id
`

func CreateFavoriteRecipe(recipeId, userId uuid.UUID) (*tables.FavoriteRecipe, error) {
	db := getDb()

	var favoriteRecipe tables.FavoriteRecipe
	err := pgxscan.Get(
		ctx,
		db,
		&favoriteRecipe,
		createFavoriteRecipeCommand,
		recipeId,
		userId,
	)

	return &favoriteRecipe, err
}

var deleteFavoriteRecipeCommand = `
DELETE FROM favorite_recipe
WHERE recipe_id=$1 AND user_id=$2
`

func DeleteFavoriteRecipe(recipeId, userId uuid.UUID) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteFavoriteRecipeCommand, recipeId, userId)
	return err
}

var deleteFavoriteRecipeByUserIdCommand = `
DELETE FROM recipe_tag
WHERE user_id=$1
`

func DeleteFavoriteRecipesByUserId(userId uuid.UUID) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteFavoriteRecipeByUserIdCommand, userId)
	return err
}
