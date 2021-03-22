package validation

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/models"
)

var ErrInvalidStepNumbers = errors.New("the provided step values does not follow a continous scale from 0 -> number of steps")

func ValidateRecipe(recipe *models.NewRecipeJson) error {
	if validateStepNumbers(recipe.Steps) == false {
		return ErrInvalidStepNumbers
	}

	return nil
}


func validateStepNumbers(steps []models.NewRecipeStepJson) bool {
	var i uint16
	for i = 0; i < uint16(len(steps)); i++ {
		if validateStepNumberExists(steps, i) == false {
			return false
		}
	}

	return true
}

func validateStepNumberExists(steps []models.NewRecipeStepJson, i uint16) bool {
	for _, step := range steps {
		if step.Number == i {
			return true
		}
	}
	return false
}