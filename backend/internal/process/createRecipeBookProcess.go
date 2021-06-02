package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"strings"
)

func CreateNewRecipeBook(recipeBookJson *models.NewRecipeBookJson, user *tables.User) (string, error) {
	uniqueName, err := generateUniqueBookName(recipeBookJson.Name)
	if err != nil {
		return "", err
	}

	recipeBook, err := commands.CreateRecipeBook(recipeBookJson.Name, uniqueName, recipeBookJson.Author, user.ID)
	if err != nil {
		return "", err
	}

	err = createRecipeBookRecipes(recipeBook.ID, recipeBookJson.Recipes)
	if err != nil {
		return "", err
	}

	err = connectImagesToRecipeBook(recipeBook.ID, recipeBookJson.Images)
	if err != nil {
		return "", err
	}

	return recipeBook.UniqueName, nil
}

func generateUniqueBookName(name string) (string, error) {
	lowerCase := strings.ToLower(name)
	uniqueName := strings.ReplaceAll(lowerCase, " ", "_")

	_, err := queries.GetRecipeBookByName(uniqueName)
	if err != nil {
		if pgxscan.NotFound(err) {
			return uniqueName, nil
		}
		return "", err
	}

	return uniqueName, common.ErrNameTaken
}

func createRecipeBookRecipes(recipeBookId uint64, recipes []uint64) error {
	for _, recipe := range recipes {
		_, err := commands.CreateRecipeBookRecipe(recipeBookId, recipe)
		if err != nil {
			return err
		}
	}
	return nil
}

func connectImagesToRecipeBook(recipeBookId uint64, imageIds []uint64) error {
	for _, imageId := range imageIds {
		_, err := commands.CreateRecipeBookImage(recipeBookId, imageId)
		if err != nil {
			return err
		}
	}

	return nil
}