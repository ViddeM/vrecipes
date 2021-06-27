package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

type RecipesJson struct {
	Recipes []ShortRecipeJson `json:"recipes"`
}

type ShortRecipeJson struct {
	ID         uuid.UUID   `json:"id"`
	Name       string      `json:"name"`
	UniqueName string      `json:"unique_name"`
	ImageLink  string      `json:"image_link"`
	Author     tables.User `json:"author"`
}

func toShortRecipeJson(recipe *tables.Recipe, user *tables.User, imageUrl string) ShortRecipeJson {
	return ShortRecipeJson{
		ID:         recipe.ID,
		Name:       recipe.Name,
		UniqueName: recipe.UniqueName,
		ImageLink:  imageUrl,
		Author:     *user,
	}
}

func GetRecipes() (*RecipesJson, error) {
	recipes, err := queries.GetNonDeletedRecipes()
	if err != nil {
		return nil, err
	}

	if recipes == nil {
		recipes = make([]*tables.Recipe, 0)
	}

	shortRecipes := make([]ShortRecipeJson, 0)
	for _, recipe := range recipes {
		image, err := queries.GetMainImageForRecipe(recipe.ID)

		imageUrl := ""
		if err != nil {
			if pgxscan.NotFound(err) == false {
				return nil, err
			}
		} else {
			imageUrl = imageNameToPath(image.ID, image.Name)
		}

		user, err := queries.GetUser(recipe.CreatedBy)
		if err != nil {
			return nil, err
		}

		shortRecipes = append(shortRecipes, toShortRecipeJson(recipe, user, imageUrl))
	}

	return &RecipesJson{
		Recipes: shortRecipes,
	}, nil
}
