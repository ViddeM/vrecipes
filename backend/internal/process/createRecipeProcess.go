package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"strings"
)

func GetOrCreateIngredient(ingredientName string) (*tables.Ingredient, error) {
	ingredientName = strings.TrimSpace(ingredientName)
	ingredient, err := queries.GetIngredient(ingredientName)
	if err != nil {
		if pgxscan.NotFound(err) {
			// Ingredient doesn't exist, create a new one
			ingredient, err = commands.CreateIngredient(ingredientName)
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
		if pgxscan.NotFound(err) {
			// Ingredient doesn't exist, create a new one
			unit, err = commands.CreateUnit(unitName)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}
	return unit, nil
}

func CreateRecipeIngredient(
	ingredientName string,
	unitName string,
	amount float32,
	recipeId uuid.UUID,
) (*tables.RecipeIngredient, error) {
	ingredient, err := GetOrCreateIngredient(ingredientName)
	if err != nil {
		return nil, err
	}

	unit, err := GetOrCreateUnit(unitName)
	if err != nil {
		return nil, err
	}

	recipeIngredient, err := commands.CreateRecipeIngredient(
		recipeId,
		ingredient.Name,
		unit.Name,
		amount,
	)
	return recipeIngredient, err
}

func CreateRecipeStep(
	step string,
	number uint16,
	recipeId uuid.UUID,
) (*tables.RecipeStep, error) {
	recipeStep, err := commands.CreateRecipeStep(recipeId, number, step)
	return recipeStep, err
}

func CreateRecipeImage(
	imagePath string,
	recipeId uuid.UUID,
) (*tables.RecipeImage, error) {
	imageId, err := commands.CreateImage(imagePath)

	if err != nil {
		return nil, err
	}

	return connectImageToRecipe(recipeId, imageId)
}

func connectImageToRecipe(
	recipeId uuid.UUID,
	imageId uuid.UUID,
) (*tables.RecipeImage, error) {
	return commands.CreateRecipeImage(recipeId, imageId)
}

func connectTagToRecipe(recipeId, tagId uuid.UUID) (*tables.RecipeTag, error) {
	return commands.CreateRecipeTag(recipeId, tagId)
}

func CreateRecipe(
	name, description string,
	ovenTemp, estimatedTime int,
	userId uuid.UUID,
) (*tables.Recipe, error) {
	uniqueName, err := generateUniqueName(name)
	if err != nil {
		return nil, err
	}
	recipe, err := commands.CreateRecipe(
		name,
		uniqueName,
		description,
		ovenTemp,
		estimatedTime,
		userId,
	)
	return recipe, err
}

func CreateNewRecipe(
	recipeJson *models.NewRecipeJson,
	user *tables.User,
) (string, error) {
	recipe, err := CreateRecipe(
		recipeJson.Name,
		recipeJson.Description,
		recipeJson.OvenTemperature,
		recipeJson.CookingTime,
		user.ID,
	)
	if err != nil {
		return "", err
	}

	for _, ingredient := range recipeJson.Ingredients {
		_, err := CreateRecipeIngredient(
			ingredient.Name,
			ingredient.Unit,
			ingredient.Amount,
			recipe.ID,
		)
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
		_, err := connectImageToRecipe(recipe.ID, image.ID)
		if err != nil {
			return "", err
		}
	}

	for _, tagId := range recipeJson.Tags {
		_, err := connectTagToRecipe(recipe.ID, tagId)
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
		if pgxscan.NotFound(err) {
			return uniqueName, nil
		}
		return "", err
	}
	return uniqueName, common2.ErrNameTaken
}
