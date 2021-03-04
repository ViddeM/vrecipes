package process

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"gorm.io/gorm"
)

type DetailedRecipeJson struct {
	ID uint64 `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
	OvenTemperature int `json:"ovenTemperature"`
	EstimatedTime int `json:"estimatedTime"`
	Steps []RecipeStepJson `json:"steps"`
	Ingredients []RecipeIngredientJson `json:"ingredients"`
	Images []RecipeImageJson `json:"images"`
}

type RecipeStepJson struct {
	Number uint16 `json:"number"`
	Description string `json:"description"`
}

type RecipeIngredientJson struct {
	Name string `json:"name"`
	Unit string `json:"unit"`
	Amount float32 `json:"amount"`
}

type RecipeImageJson struct {
	Path string `json:"url"`
	ID   uint64 `json:"id"`
}

func GetRecipe(uniqueName string) (*DetailedRecipeJson, error) {
	recipe, err := queries.GetRecipeByName(uniqueName)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, common.NoSuchRecipe
		}
		return nil, err
	}

	steps, err := queries.GetStepsForRecipe(recipe.ID)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	ingredients, err := queries.GetIngredientsForRecipe(recipe.ID)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	images, err := queries.GetImagesForRecipe(recipe.ID)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	return &DetailedRecipeJson{
		ID:              recipe.ID,
		Name:            recipe.Name,
		Description:     recipe.Description,
		OvenTemperature: recipe.OvenTemp,
		EstimatedTime:   recipe.EstimatedTime,
		Steps:           RecipeStepsToJson(steps),
		Ingredients:     RecipeIngredientsToJson(ingredients),
		Images:          RecipeImagesToJson(images),
	}, nil
}

func RecipeStepsToJson(steps []models.RecipeStep) []RecipeStepJson {
	var recipeStepJsons []RecipeStepJson
	for _, step := range steps {
		recipeStepJsons = append(recipeStepJsons, RecipeStepJson{
			Number:      step.Number,
			Description: step.Step,
		})
	}
	return recipeStepJsons
}

func RecipeIngredientsToJson(ingredients []models.RecipeIngredient) []RecipeIngredientJson {
	var recipeIngredientJsons []RecipeIngredientJson
	for _, ingredient := range ingredients {
		recipeIngredientJsons = append(recipeIngredientJsons, RecipeIngredientJson{
			Name:  	ingredient.IngredientName,
			Unit:   ingredient.UnitName,
			Amount: ingredient.Amount,
		})
	}
	return recipeIngredientJsons
}

func RecipeImagesToJson(images []models.RecipeImage) []RecipeImageJson {
	var recipeImageJsons []RecipeImageJson
	for _, image := range images {
		recipeImageJsons = append(recipeImageJsons, RecipeImageJson{
			Path: image.Image.Name,
			ID:   image.ImageID,
		})
	}
	return recipeImageJsons
}