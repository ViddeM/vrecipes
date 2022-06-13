package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func GetRecipeBook(uniqueName string) (*models.DetailedRecipeBookJson, error) {
	recipeBook, err := queries.GetRecipeBookByName(uniqueName)
	if err != nil {
		if pgxscan.NotFound(err) {
			return nil, common.ErrNoSuchRecipeBook
		}
		return nil, err
	}

	if recipeBook.Deleted {
		return nil, common.ErrNoSuchRecipeBook
	}

	recipes, err := queries.GetRecipesForRecipeBook(recipeBook.ID)
	if err != nil && !pgxscan.NotFound(err) {
		return nil, err
	}

	var imageJson *models.ImageJson = nil
	image, err := queries.GetImageForRecipeBook(recipeBook.ID)
	if err != nil {
		if !pgxscan.NotFound(err) {
			return nil, err
		}
	} else {
		imageJson = &models.ImageJson{
			Path: imageNameToPath(image.ID, image.Name),
			ID:   image.ID,
		}
	}

	user, err := queries.GetUser(recipeBook.CreatedBy)
	if err != nil {
		return nil, err
	}

	recipeJsons, err := RecipesToJson(recipes)
	if err != nil {
		return nil, err
	}

	return &models.DetailedRecipeBookJson{
		ID:         recipeBook.ID,
		Name:       recipeBook.Name,
		UniqueName: recipeBook.UniqueName,
		UploadedBy: *user,
		Author:     recipeBook.Author,
		Recipes:    recipeJsons,
		Image:      imageJson,
	}, nil
}

func RecipesToJson(recipes []*tables.Recipe) (
	[]models.RecipeBookRecipeJson,
	error,
) {
	recipeJsons := make([]models.RecipeBookRecipeJson, 0)
	for _, recipe := range recipes {
		author, err := queries.GetUser(recipe.CreatedBy)
		if err != nil {
			return nil, err
		}

		recipeJsons = append(
			recipeJsons, models.RecipeBookRecipeJson{
				Name:       recipe.Name,
				UniqueName: recipe.UniqueName,
				Author:     author.Name,
				ID:         recipe.ID,
			},
		)
	}

	return recipeJsons, nil
}
