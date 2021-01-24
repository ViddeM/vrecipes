package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
)

type RecipesJson struct {
	Recipes []ShortRecipeJson `json:"recipes"`
}

type ShortRecipeJson struct {
	ID uint64 `json:"id"`
	Name string `json:"name"`
	UniqueName string `json:"unique_name"`
	ImageLink string `json:"image_link"`
}

func toShortRecipeJson(recipe *models.Recipe) ShortRecipeJson {
	return ShortRecipeJson{
		ID:         recipe.ID,
		Name:       recipe.Name,
		UniqueName: recipe.UniqueName,
		ImageLink:  "",
	}
}

func GetRecipes() (*RecipesJson, error) {
	recipes, err := queries.GetAllRecipes()
	if err != nil {
		return nil, err
	}

	var shortRecipes []ShortRecipeJson

	for _, recipe := range recipes {
		shortRecipes = append(shortRecipes, toShortRecipeJson(&recipe))
	}

	return &RecipesJson{
		Recipes: shortRecipes,
	}, nil
}