package process

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func EditRecipe(
	oldRecipe *tables.Recipe,
	newRecipe *models.EditRecipeJson,
) (string, error) {
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

	err = updateRecipeTags(oldRecipe.ID, newRecipe.Tags)
	if err != nil {
		return "", err
	}

	return uniqueName, nil
}

func updateRecipeGeneral(
	oldRecipe *tables.Recipe,
	newRecipe *models.EditRecipeJson,
) (string, error) {
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

	if oldRecipe.EstimatedTime != newRecipe.EstimatedTime ||
		oldRecipe.Description != newRecipe.Description ||
		oldRecipe.OvenTemp != newRecipe.OvenTemperature {
		changed = true
	}

	if changed {
		err := commands.UpdateRecipe(
			newRecipe.Name,
			uniqueName,
			newRecipe.Description,
			newRecipe.OvenTemperature,
			newRecipe.EstimatedTime,
			oldRecipe.ID,
		)
		if err != nil {
			return "", err
		}
	}

	return uniqueName, nil
}

func updateRecipeSteps(id uuid.UUID, steps []models.EditRecipeStepJson) error {
	oldSteps, err := queries.GetStepsForRecipe(id)
	if err != nil {
		return err
	}

	for _, step := range steps {
		oldStep := getStepWithNumber(step.Number, oldSteps)
		if oldStep == nil {
			// There is no oldStep with the same number, add it
			_, err = CreateRecipeStep(step.Description, step.Number, id)

			if err != nil {
				return err
			}
		} else if step.SameAs(oldStep) == false {
			// The step is updated
			err = commands.UpdateRecipeStep(
				step.Description,
				oldStep.RecipeID,
				oldStep.Number,
			)

			if err != nil {
				return err
			}
		}
	}

	if len(oldSteps) > len(steps) {
		// Delete any excess steps
		for _, oldStep := range oldSteps {
			if oldStep.Number >= uint16(len(steps)) {
				err = commands.DeleteRecipeStep(
					oldStep.RecipeID,
					oldStep.Number,
				)
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}

func getStepWithNumber(
	number uint16,
	oldSteps []*tables.RecipeStep,
) *tables.RecipeStep {
	for _, oldStep := range oldSteps {
		if oldStep.Number == number {
			return oldStep
		}
	}
	return nil
}

func updateRecipeIngredients(
	id uuid.UUID,
	ingredients []models.EditRecipeIngredientJson,
) error {
	oldIngredients, err := queries.GetIngredientsForRecipe(id)
	if err != nil {
		return err
	}

	var ingredientIdNumMap = make(map[uuid.UUID]int)
	for index, ingredient := range ingredients {
		oldIngredient := getOldIngredient(&ingredient, oldIngredients)
		if oldIngredient == nil {
			// The ingredient is new or updated
			newRecipeIngredient, err := CreateRecipeIngredient(
				ingredient.Name,
				ingredient.Unit,
				ingredient.Amount,
				id,
			)
			if err != nil {
				return err
			}
			ingredientIdNumMap[newRecipeIngredient.ID] = index
		} else {
			ingredientIdNumMap[oldIngredient.ID] = index
		}
	}

	// Remove ingredients that are no longer in the recipe.
	for _, oldIngredient := range oldIngredients {
		found := false
		for handledId := range ingredientIdNumMap {
			if oldIngredient.ID == handledId {
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

	// Update numbers of ingredients
	err = commands.UpdateRecipeIngredientNumbers(ingredientIdNumMap, id)

	return err
}

func getOldIngredient(
	ingredient *models.EditRecipeIngredientJson,
	oldIngredients []*tables.RecipeIngredient,
) *tables.RecipeIngredient {
	for _, oldIngredient := range oldIngredients {
		if ingredient.SameAs(oldIngredient) {
			return oldIngredient
		}
	}

	return nil
}

func updateRecipeImages(
	id uuid.UUID,
	images []models.EditRecipeImageJson,
) error {
	oldImages, err := queries.GetImagesForRecipe(id)
	if err != nil {
		return err
	}

	var handledImages []uuid.UUID
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

func getOldImage(
	image *models.EditRecipeImageJson,
	oldImages []tables.Image,
) *tables.Image {
	for _, oldImage := range oldImages {
		if image.SameAs(&oldImage) {
			return &oldImage
		}
	}

	return nil
}

func updateRecipeTags(recipeId uuid.UUID, tags []uuid.UUID) error {
	oldTags, err := queries.GetTagsForRecipe(&recipeId)
	if err != nil {
		return err
	}

	for _, tag := range tags {
		oldTag := getOldTag(tag, oldTags)
		if oldTag == nil {
			// The tag is new
			_, err := connectTagToRecipe(recipeId, tag)
			if err != nil {
				return err
			}
		}
	}

	for _, oldTag := range oldTags {
		found := false
		for _, tag := range tags {
			if oldTag.TagId == tag {
				found = true
				break
			}
		}

		if !found {
			// The tag was removed
			err = commands.DeleteRecipeTag(recipeId, oldTag.TagId)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func getOldTag(tag uuid.UUID, oldTags []*tables.RecipeTag) *tables.RecipeTag {
	for _, oldTag := range oldTags {
		if oldTag.TagId == tag {
			return oldTag
		}
	}
	return nil
}
