package process

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/common"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"gorm.io/gorm"
	"strings"
)

func GetOrCreateIngredient(ingredientName string) (*models.Ingredient, error) {
	ingredientName = strings.ToLower(strings.TrimSpace(ingredientName))
	ingredient, err := queries.GetIngredient(ingredientName)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// Ingredient doesn't exist, create a new one
			ingredient = &models.Ingredient{
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

func GetOrCreateUnit(unitName string) (*models.Unit, error) {
	unitName = strings.ToLower(unitName)
	unit, err := queries.GetUnit(unitName)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// Ingredient doesn't exist, create a new one
			unit = &models.Unit{
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

func CreateRecipeIngredient(ingredientName string, unitName string, amount float32, recipe *models.Recipe) (*models.RecipeIngredient, error) {
	ingredient, err := GetOrCreateIngredient(ingredientName)
	if err != nil {
		return nil, err
	}

	unit, err := GetOrCreateUnit(unitName)
	if err != nil {
		return nil, err
	}

	recipeIngredient := models.RecipeIngredient{
		Recipe:     *recipe,
		Ingredient: *ingredient,
		Unit:       *unit,
		Amount:     amount,
	}

	err = commands.CreateRecipeIngredient(&recipeIngredient)
	return &recipeIngredient, err
}

func CreateRecipeStep(step string, number uint16, recipe *models.Recipe) (*models.RecipeStep, error) {
	recipeStep := models.RecipeStep{
		Recipe: *recipe,
		Number: number,
		Step:   step,
	}
	err := commands.CreateRecipeStep(&recipeStep)
	if err != nil {
		return &recipeStep, err
	}

	return &recipeStep, nil
}

func CreateRecipe(name, description string, ovenTemp, estimatedTime int) (*models.Recipe, error) {
	uniqueName, err := generateUniqueName(name)
	if err != nil {
		return &models.Recipe{}, err
	}

	recipe := models.Recipe{
		Name:          name,
		UniqueName:    uniqueName,
		Description:   description,
		OvenTemp:      ovenTemp,
		EstimatedTime: estimatedTime,
	}

	_, err = commands.CreateRecipe(&recipe)

	return &recipe, err
}

func generateUniqueName(name string) (string, error) {
	uniqueName := strings.ReplaceAll(strings.ToLower(name), " ", "_")
	_, err := queries.GetRecipeByName(uniqueName)
	if err != nil {
		if errors.Is(gorm.ErrRecordNotFound, err) {
			return uniqueName, nil
		}
		return "", err
	}
	return uniqueName, common.RowAlreadyExists
}