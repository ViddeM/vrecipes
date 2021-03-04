package process

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"gorm.io/gorm"
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

func toShortRecipeJson(recipe *models.Recipe, imageUrl string) ShortRecipeJson {
	return ShortRecipeJson{
		ID:         recipe.ID,
		Name:       recipe.Name,
		UniqueName: recipe.UniqueName,
		ImageLink:  imageUrl,
	}
}

func GetRecipes() (*RecipesJson, error) {
	recipes, err := queries.GetAllRecipes()
	if err != nil {
		return nil, err
	}

	var shortRecipes []ShortRecipeJson

	for _, recipe := range recipes {
		recipeImage, err := queries.GetMainImageForRecipe(recipe.ID)

		imageUrl := ""
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) == false {
				return nil, err
			}
		} else {
			imageUrl = recipeImage.Image.Name
		}

		shortRecipes = append(shortRecipes, toShortRecipeJson(&recipe, imageUrl))
	}

	return &RecipesJson{
		Recipes: shortRecipes,
	}, nil
}