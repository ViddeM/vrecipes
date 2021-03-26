package process

import (
	"errors"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"gorm.io/gorm"
	"strings"
)

func GetOrCreateIngredient(ingredientName string) (*tables.Ingredient, error) {
	ingredientName = strings.ToLower(strings.TrimSpace(ingredientName))
	ingredient, err := queries.GetIngredient(ingredientName)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// Ingredient doesn't exist, create a new one
			ingredient = &tables.Ingredient{
				Name: ingredientName,
			}
			err := commands.CreateIngredient(ingredient)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}
	return ingredient, nil
}

func GetOrCreateUnit(unitName string) (*tables.Unit, error) {
	unitName = strings.ToLower(unitName)
	unit, err := queries.GetUnit(unitName)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// Ingredient doesn't exist, create a new one
			unit = &tables.Unit{
				Name: unitName,
			}
			err := commands.CreateUnit(unit)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}
	return unit, nil
}

func CreateRecipeIngredient(ingredientName string, unitName string, amount float32, recipeId uint64) (*tables.RecipeIngredient, error) {
	ingredient, err := GetOrCreateIngredient(ingredientName)
	if err != nil {
		return nil, err
	}

	unit, err := GetOrCreateUnit(unitName)
	if err != nil {
		return nil, err
	}

	recipeIngredient := tables.RecipeIngredient{
		RecipeID:   recipeId,
		Ingredient: *ingredient,
		Unit:       *unit,
		Amount:     amount,
	}

	err = commands.CreateRecipeIngredient(&recipeIngredient)
	return &recipeIngredient, err
}

func CreateRecipeStep(step string, number uint16, recipeId uint64) (*tables.RecipeStep, error) {
	recipeStep := tables.RecipeStep{
		RecipeID: recipeId,
		Number:   number,
		Step:     step,
	}
	err := commands.CreateRecipeStep(&recipeStep)
	if err != nil {
		return &recipeStep, err
	}

	return &recipeStep, nil
}

func CreateRecipeImage(imagePath string, recipeId uint64) (*tables.RecipeImage, error) {
	imageId, err := commands.CreateImage(&tables.Image{
		Name: imagePath,
	})

	if err != nil {
		return nil, err
	}

	return connectImageToRecipe(imageId, recipeId)
}

func connectImageToRecipe(imageId uint64, recipeId uint64) (*tables.RecipeImage, error) {
	recipeImage := tables.RecipeImage{
		ImageID:  imageId,
		RecipeID: recipeId,
	}

	err := commands.CreateRecipeImage(&recipeImage)

	return &recipeImage, err
}

func CreateRecipe(name, description string, ovenTemp, estimatedTime int, userId uint64) (*tables.Recipe, error) {
	uniqueName, err := generateUniqueName(name)
	if err != nil {
		return &tables.Recipe{}, err
	}

	recipe := tables.Recipe{
		Name:          name,
		UniqueName:    uniqueName,
		Description:   description,
		OvenTemp:      ovenTemp,
		EstimatedTime: estimatedTime,
		CreatedBy:     userId,
	}

	_, err = commands.CreateRecipe(&recipe)

	return &recipe, err
}

func CreateNewRecipe(recipeJson *models.NewRecipeJson, user *tables.User) (string, error) {
	recipe, err := CreateRecipe(recipeJson.Name, recipeJson.Description, recipeJson.OvenTemperature, recipeJson.CookingTime, user.ID)
	if err != nil {
		return "", err
	}

	for _, ingredient := range recipeJson.Ingredients {
		_, err := CreateRecipeIngredient(ingredient.Name, ingredient.Unit, ingredient.Amount, recipe.ID)
		if err != nil {
			return "", err
		}
	}

	for _, step := range recipeJson.Steps {
		_, err := CreateRecipeStep(step.Step, step.Number, recipe.ID)
		if err != nil {
			return "", err
		}
	}

	for _, image := range recipeJson.Images {
		_, err := connectImageToRecipe(image.ID, recipe.ID)
		if err != nil {
			return "", err
		}
	}

	return recipe.UniqueName, nil
}

func generateUniqueName(name string) (string, error) {
	lowerCase := strings.ToLower(name)
	uniqueName := strings.ReplaceAll(lowerCase, " ", "_")

	_, err := queries.GetRecipeByName(uniqueName)
	if err != nil {
		if errors.Is(gorm.ErrRecordNotFound, err) {
			return uniqueName, nil
		}
		return "", err
	}
	return uniqueName, common2.ErrNameTaken
}
