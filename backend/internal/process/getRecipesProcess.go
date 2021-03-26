package process

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
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
	Author tables.User `json:"author"`
}

func toShortRecipeJson(recipe *tables.Recipe, imageUrl string) ShortRecipeJson {
	return ShortRecipeJson{
		ID:         recipe.ID,
		Name:       recipe.Name,
		UniqueName: recipe.UniqueName,
		ImageLink:  imageUrl,
		Author:		recipe.User,
	}
}

func GetRecipes() (*RecipesJson, error) {
	recipes, err := queries.GetNonDeletedRecipes()
	if err != nil {
		return nil, err
	}

	if recipes == nil {
		recipes = make([]tables.Recipe, 0)
	}

	shortRecipes := make([]ShortRecipeJson, 0)
	for _, recipe := range recipes {
		recipeImage, err := queries.GetMainImageForRecipe(recipe.ID)

		imageUrl := ""
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) == false {
				return nil, err
			}
		} else {
			imageUrl = imageNameToPath(recipeImage.Image.ID, recipeImage.Image.Name)
		}

		user, err := queries.GetUser(recipe.CreatedBy)
		if err != nil {
			return nil, err
		}

		recipe.User = *user
		shortRecipes = append(shortRecipes, toShortRecipeJson(&recipe, imageUrl))
	}

	return &RecipesJson{
		Recipes: shortRecipes,
	}, nil
}