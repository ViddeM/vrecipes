package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/common"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"strings"
)

func CreateNewRecipe(name, description string, ovenTemp, estimatedTime int) (models.Recipe, error) {
	uniqueName, err := generateUniqueName(name)
	if err != nil {
		return models.Recipe{}, err
	}

	recipe := models.Recipe{
		Name:          name,
		UniqueName:    uniqueName,
		Description:   description,
		OvenTemp:      ovenTemp,
		EstimatedTime: estimatedTime,
	}

	err = common.RunTransaction(commands.CreateRecipe(recipe))

	return recipe, err
}

func generateUniqueName(name string) (string, error) {
	var recipe *models.Recipe
	f := false
	var found *bool = &f
	uniqueName := strings.ReplaceAll(strings.ToLower(name), " ", "_")
	err := common.RunTransaction(queries.GetRecipeByName(uniqueName, recipe, found))
	if err != nil {
		return "", err
	}

	if *found == false {
		return uniqueName, nil
	} else {
		return uniqueName, common.RowAlreadyExists
	}
}