package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"strings"
)

func EditRecipe(
	oldRecipe *tables.Recipe,
	newRecipe *models.EditRecipeJson,
) (string, error) {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return "", err
	}
	defer commands.RollbackTransaction(tx)

	uniqueName, err := updateRecipeGeneral(tx, oldRecipe, newRecipe)
	if err != nil {
		return "", err
	}

	err = updateRecipeSteps(tx, oldRecipe.ID, newRecipe.Steps)
	if err != nil {
		return "", err
	}

	err = updateRecipeIngredients(tx, oldRecipe.ID, newRecipe.Ingredients)
	if err != nil {
		return "", err
	}

	err = updateRecipeImages(tx, oldRecipe.ID, newRecipe.Images)
	if err != nil {
		return "", err
	}

	err = updateRecipeTags(tx, oldRecipe.ID, newRecipe.Tags)
	if err != nil {
		return "", err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return "", err
	}

	return uniqueName, nil
}

func updateRecipeGeneral(
	tx pgx.Tx,
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
		oldRecipe.OvenTemp != newRecipe.OvenTemperature ||
		oldRecipe.Portions != newRecipe.Portions ||
		oldRecipe.PortionsSuffix != newRecipe.PortionsSuffix {
		changed = true
	}

	if changed {
		err := commands.UpdateRecipe(
			tx,
			newRecipe.Name,
			uniqueName,
			newRecipe.Description,
			newRecipe.OvenTemperature,
			newRecipe.EstimatedTime,
			newRecipe.Portions,
			strings.TrimSpace(newRecipe.PortionsSuffix),
			oldRecipe.ID,
		)
		if err != nil {
			return "", err
		}
	}

	return uniqueName, nil
}

func updateRecipeSteps(tx pgx.Tx, id uuid.UUID, steps []models.EditRecipeStepJson) error {
	oldSteps, err := queries.GetStepsForRecipe(id)
	if err != nil {
		return err
	}

	for _, step := range steps {
		oldStep := getStepWithNumber(step.Number, oldSteps)
		if oldStep == nil {
			// There is no oldStep with the same number, add it
			_, err = CreateRecipeStep(tx, step.Description, step.Number, id, step.IsHeading)

			if err != nil {
				return err
			}
		} else if step.SameAs(oldStep) == false {
			// The step is updated
			err = commands.UpdateRecipeStep(
				tx,
				step.Description,
				oldStep.RecipeID,
				oldStep.Number,
				step.IsHeading,
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
					tx,
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
	tx pgx.Tx,
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
				tx,
				ingredient.Name,
				ingredient.Unit,
				ingredient.Amount,
				ingredient.IsHeading,
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
			err = commands.DeleteRecipeIngredient(tx, oldIngredient.ID)
			if err != nil {
				return err
			}
		}
	}

	// Update numbers of ingredients
	err = commands.UpdateRecipeIngredientNumbers(tx, ingredientIdNumMap, id)

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
	tx pgx.Tx,
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
			_, err = connectImageToRecipe(tx, id, image.ID)
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
			err = commands.DeleteRecipeImage(tx, id, oldImage.ID)
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

func updateRecipeTags(tx pgx.Tx, recipeId uuid.UUID, tags []uuid.UUID) error {
	oldTags, err := queries.GetTagsForRecipe(&recipeId)
	if err != nil {
		return err
	}

	for _, tag := range tags {
		oldTag := getOldTag(tag, oldTags)
		if oldTag == nil {
			// The tag is new
			_, err := connectTagToRecipe(tx, recipeId, tag)
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
			err = commands.DeleteRecipeTag(tx, recipeId, oldTag.TagId)
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

func CreateRecipeIngredient(
	tx pgx.Tx,
	ingredientName string,
	unitName string,
	amount float32,
	isHeading bool,
	recipeId uuid.UUID,
) (*tables.RecipeIngredient, error) {
	ingredient, err := getOrCreateIngredient(tx, ingredientName)
	if err != nil {
		return nil, err
	}

	unit, err := getOrCreateUnit(tx, unitName)
	if err != nil {
		return nil, err
	}

	if isHeading {
		recipeIngredient, err := commands.CreateRecipeIngredientHeading(tx, recipeId, ingredientName)
		return recipeIngredient, err
	}

	recipeIngredient, err := commands.CreateRecipeIngredient(
		tx,
		recipeId,
		ingredient.Name,
		unit.Name,
		amount,
	)
	return recipeIngredient, err
}

func getOrCreateIngredient(tx pgx.Tx, ingredientName string) (*tables.Ingredient, error) {
	ingredientName = strings.TrimSpace(ingredientName)
	ingredient, err := queries.GetIngredient(ingredientName)
	if err != nil {
		if pgxscan.NotFound(err) {
			// Ingredient doesn't exist, create a new one
			ingredient, err = commands.CreateIngredient(tx, ingredientName)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}
	return ingredient, nil
}

func getOrCreateUnit(tx pgx.Tx, unitName string) (*tables.Unit, error) {
	unitName = strings.ToLower(unitName)
	unit, err := queries.GetUnit(unitName)
	if err != nil {
		if pgxscan.NotFound(err) {
			// Ingredient doesn't exist, create a new one
			unit, err = commands.CreateUnit(tx, unitName)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}
	return unit, nil
}

func CreateRecipeStep(
	tx pgx.Tx,
	step string,
	number uint16,
	recipeId uuid.UUID,
	isHeading bool,
) (*tables.RecipeStep, error) {
	recipeStep, err := commands.CreateRecipeStep(tx, recipeId, number, step, isHeading)
	return recipeStep, err
}

func connectImageToRecipe(
	tx pgx.Tx,
	recipeId uuid.UUID,
	imageId uuid.UUID,
) (*tables.RecipeImage, error) {
	return commands.CreateRecipeImage(tx, recipeId, imageId)
}

func connectTagToRecipe(tx pgx.Tx, recipeId, tagId uuid.UUID) (*tables.RecipeTag, error) {
	return commands.CreateRecipeTag(tx, recipeId, tagId)
}
