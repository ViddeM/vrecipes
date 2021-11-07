package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

type RecipesJson struct {
	Recipes []ShortRecipeJson `json:"recipes"`
}

type ShortRecipeJson struct {
	ID         uuid.UUID        `json:"id"`
	Name       string           `json:"name"`
	UniqueName string           `json:"unique_name"`
	ImageLink  string           `json:"image_link"`
	Author     tables.User      `json:"author"`
	Tags       []models.TagJson `json:"tags"`
}

func toShortRecipeJson(
	recipe *tables.Recipe,
	user *tables.User,
	imageUrl string,
	tags []models.TagJson,
) ShortRecipeJson {
	return ShortRecipeJson{
		ID:         recipe.ID,
		Name:       recipe.Name,
		UniqueName: recipe.UniqueName,
		ImageLink:  imageUrl,
		Author:     *user,
		Tags:       tags,
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

		recipeTags, err := queries.GetTagsForRecipe(&recipe.ID)
		if err != nil {
			return nil, err
		}

		tags, err := recipeTagsToTagJsons(recipeTags)
		if err != nil {
			return nil, err
		}

		shortRecipes = append(
			shortRecipes,
			toShortRecipeJson(recipe, user, imageUrl, tags),
		)
	}

	return &RecipesJson{
		Recipes: shortRecipes,
	}, nil
}

func recipeTagsToTagJsons(recipeTags []*tables.RecipeTag) (
	[]models.TagJson,
	error,
) {
	tagJson := make([]models.TagJson, 0)
	for _, recipeTag := range recipeTags {
		tag, err := queries.GetTagById(recipeTag.TagId)
		if err != nil {
			return nil, err
		}

		author, err := queries.GetUser(tag.CreatedBy)
		if err != nil {
			return nil, err
		}

		recipesCount, err := queries.CountRecipesWithTag(&tag.ID)
		if err != nil {
			return nil, err
		}

		tagJson = append(
			tagJson, models.TagJson{
				ID:          tag.ID,
				Name:        tag.Name,
				Description: tag.Description,
				Color: models.ColorJson{
					R: &tag.ColorRed,
					G: &tag.ColorGreen,
					B: &tag.ColorBlue,
				},
				RecipeCount: recipesCount,
				Author:      *author,
			},
		)
	}

	return tagJson, nil
}
