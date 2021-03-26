package process

import (
	"errors"
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"gorm.io/gorm"
	"os"
)

func GetRecipe(uniqueName string) (*models.DetailedRecipeJson, error) {
	recipe, err := queries.GetRecipeByName(uniqueName)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, common.ErrNoSuchRecipe
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

	user, err := queries.GetUser(recipe.CreatedBy)
	if err != nil {
		return nil, err
	}

	return &models.DetailedRecipeJson{
		ID:              recipe.ID,
		Name:            recipe.Name,
		Description:     recipe.Description,
		OvenTemperature: recipe.OvenTemp,
		EstimatedTime:   recipe.EstimatedTime,
		Steps:           RecipeStepsToJson(steps),
		Ingredients:     RecipeIngredientsToJson(ingredients),
		Images:          RecipeImagesToJson(images),
		Author:			 *user,
	}, nil
}

func RecipeStepsToJson(steps []tables.RecipeStep) []models.RecipeStepJson {
	recipeStepJsons := make([]models.RecipeStepJson, 0)
	for _, step := range steps {
		recipeStepJsons = append(recipeStepJsons, models.RecipeStepJson{
			Number:      step.Number,
			Description: step.Step,
		})
	}
	return recipeStepJsons
}

func RecipeIngredientsToJson(ingredients []tables.RecipeIngredient) []models.RecipeIngredientJson {
	recipeIngredientJsons := make([]models.RecipeIngredientJson, 0)
	for _, ingredient := range ingredients {
		recipeIngredientJsons = append(recipeIngredientJsons, models.RecipeIngredientJson{
			Name:   ingredient.IngredientName,
			Unit:   ingredient.UnitName,
			Amount: ingredient.Amount,
		})
	}
	return recipeIngredientJsons
}

func RecipeImagesToJson(images []tables.Image) []models.ImageJson {
	recipeImageJsons := make([]models.ImageJson, 0)
	for _, image := range images {
		recipeImageJsons = append(recipeImageJsons, models.ImageJson{
			Path: imageNameToPath(image.ID, image.Name),
			ID:   image.ID,
		})
	}
	return recipeImageJsons
}

func imageNameToPath(id uint64, name string) string {
	imagePath := common.GetEnvVars().ImageFolder
	filePath := fmt.Sprintf("%s/%s", imagePath, name)
	_, err := os.Stat(filePath)
	if err == nil {
		return name
	}

	nameWithId := fmt.Sprintf("%d_%s", id, name)
	filePath = fmt.Sprintf("%s/%s", imagePath, nameWithId)
	return nameWithId
}
