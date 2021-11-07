package validation

import (
	"errors"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/models"
)

var ErrInvalidStepNumbers = errors.New("the provided step values does not follow a continous scale from 0 -> number of steps")
var ErrInvalidIngredient = errors.New("ingredient amount / unit can only be empty if both are empty")
var ErrImageNotExist = errors.New("the image does not exist")
var ErrTagNotExist = errors.New("the tag doesn't exist")

func ValidateRecipe(recipe *models.NewRecipeJson) error {
	err := validateStepNumbers(recipe.Steps)
	if err != nil {
		return err
	}

	err = validateIngredients(recipe.Ingredients)
	if err != nil {
		return err
	}

	err = validateImages(recipe.Images)
	if err != nil {
		return err
	}

	err = validateTags(recipe.Tags)
	if err != nil {
		return err
	}

	return nil
}

func validateIngredients(ingredients []models.NewRecipeIngredientJson) error {
	for _, ingredient := range ingredients {
		if (ingredient.Amount <= 0 && ingredient.Unit != "") ||
			(ingredient.Unit == "" && ingredient.Amount > 0) {
			return ErrInvalidIngredient
		}
	}
	return nil
}

func validateStepNumbers(steps []models.NewRecipeStepJson) error {
	var i uint16
	for i = 0; i < uint16(len(steps)); i++ {
		if validateStepNumberExists(steps, i) == false {
			return ErrInvalidStepNumbers
		}
	}

	return nil
}

func validateStepNumberExists(steps []models.NewRecipeStepJson, i uint16) bool {
	for _, step := range steps {
		if step.Number == i {
			return true
		}
	}
	return false
}

func validateImages(images []models.NewRecipeImageJson) error {
	for _, image := range images {
		_, err := queries.GetImageById(image.ID)
		if err != nil {
			return ErrImageNotExist
		}
	}
	return nil
}

func validateTags(tags []uuid.UUID) error {
	for _, tag := range tags {
		_, err := queries.GetTagById(tag)
		if err != nil {
			return ErrTagNotExist
		}
	}

	return nil
}
