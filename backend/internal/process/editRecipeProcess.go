package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func EditRecipe(oldRecipe *tables.Recipe, newRecipe *models.NewRecipeJson) (string, error) {
	uniqueName, err := updateRecipeGeneral(oldRecipe, newRecipe)
	if err != nil {
		return "", err
	}

	err = updateRecipeSteps(oldRecipe.ID, newRecipe.Steps)
	if err != nil {
		return "", err
	}

	err = updateRecipeIngredients(oldRecipe.ID, newRecipe.Ingredients)
	if err != nil {
		return "", err
	}

	err = updateRecipeImages(oldRecipe.ID, newRecipe.Images)
	if err != nil {
		return "", err
	}

	return uniqueName, nil
}

func updateRecipeGeneral(oldRecipe *tables.Recipe, newRecipe *models.NewRecipeJson) (string, error)  {
	uniqueName := oldRecipe.UniqueName
	changed := false
	if oldRecipe.Name != newRecipe.Name {
		// Need to generate a new uniqueName
		newUniqueName, err := generateUniqueName(newRecipe.Name)
		if err != nil {
			return "", err
		}
		uniqueName = newUniqueName
		changed = true
	}

	if oldRecipe.EstimatedTime != newRecipe.CookingTime ||
		oldRecipe.Description != newRecipe.Description ||
		oldRecipe.OvenTemp != newRecipe.OvenTemperature {
		changed = true
	}

	if changed {
		rec := tables.Recipe{
			ID:            oldRecipe.ID,
			Name:          newRecipe.Name,
			UniqueName:    uniqueName,
			Description:   newRecipe.Description,
			OvenTemp:      newRecipe.OvenTemperature,
			EstimatedTime: newRecipe.CookingTime,
		}
		err := commands.UpdateRecipe(rec.Name, rec.UniqueName, rec.Description, rec.OvenTemp, rec.EstimatedTime, rec.ID)
		if err != nil {
			return "", err
		}
	}

	return uniqueName, nil
}

func updateRecipeSteps(id uint64, steps []models.NewRecipeStepJson) error {
	oldSteps, err := queries.GetStepsForRecipe(id)
	if err != nil {
		return err
	}

	for _, step := range steps {
		oldStep := getStepWithNumber(step.Number, oldSteps)
		if oldStep == nil {
			// There is no oldStep with the same number, add it
			_, err = CreateRecipeStep(step.Step, step.Number, id)

			if err != nil {
				return err
			}
		} else if step.SameAs(oldStep) == false {
			// The step is updated
			err = commands.UpdateRecipeStep(step.Step, oldStep.RecipeID, oldStep.Number)

			if err != nil {
				return err
			}
		}
	}

	if len(oldSteps) > len(steps) {
		// Delete any excess steps
		for _, oldStep := range oldSteps {
			if oldStep.Number >= uint16(len(steps)) {
				err = commands.DeleteRecipeStep(oldStep.RecipeID, oldStep.Number)
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}

func getStepWithNumber(number uint16, oldSteps []*tables.RecipeStep) *tables.RecipeStep {
	for _, oldStep := range oldSteps {
		if oldStep.Number == number {
			return oldStep
		}
	}
	return nil
}

func updateRecipeIngredients(id uint64, ingredients []models.NewRecipeIngredientJson) error {
	oldIngredients, err := queries.GetIngredientsForRecipe(id)
	if err != nil {
		return err
	}

	var handledIngredients []*tables.RecipeIngredient

	for _, ingredient := range ingredients {
		oldIngredient := getOldIngredient(&ingredient, oldIngredients)
		if oldIngredient == nil {
			// The ingredient is new or updated
			_, err = CreateRecipeIngredient(ingredient.Name, ingredient.Unit, ingredient.Amount, id)
			if err != nil {
				return err
			}
		} else {
			handledIngredients = append(handledIngredients, oldIngredient)
		}
	}

	// Remove ingredients that are no longer in the recipe.
	for _, oldIngredient := range oldIngredients {
		found := false
		for _, handled := range handledIngredients {
			if oldIngredient.Equals(handled) {
				found = true
				break
			}
		}

		if found == false {
			err = commands.DeleteRecipeIngredient(oldIngredient.ID)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func getOldIngredient(ingredient *models.NewRecipeIngredientJson, oldIngredients []*tables.RecipeIngredient) *tables.RecipeIngredient {
	for _, oldIngredient := range oldIngredients {
		if ingredient.SameAs(oldIngredient) {
			return oldIngredient
		}
	}

	return nil
}

func updateRecipeImages(id uint64, images []models.NewRecipeImageJson) error {
	oldImages, err := queries.GetImagesForRecipe(id)
	if err != nil {
		return err
	}

	var handledImages []uint64
	for _, image := range images {
		oldImage := getOldImage(&image, oldImages)
		if oldImage == nil {
			// The image is new
			_, err = connectImageToRecipe(id, image.ID)
			if err != nil {
				return err
			}
		} else {
			handledImages = append(handledImages, oldImage.ID)
		}
	}

	for _, oldImage := range oldImages {
		found := false
		for _, handled := range handledImages {
			if oldImage.ID == handled {
				found = true
			}
		}

		if found == false {
			err = commands.DeleteRecipeImage(id, oldImage.ID)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func getOldImage(image *models.NewRecipeImageJson, oldImages []tables.Image) *tables.Image {
	for _, oldImage := range oldImages {
		if image.SameAs(&oldImage) {
			return &oldImage
		}
	}

	return nil
}