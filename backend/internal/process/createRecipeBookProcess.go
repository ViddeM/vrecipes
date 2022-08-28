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

func CreateNewRecipeBook(
	recipeBookJson *models.NewRecipeBookJson,
	user *tables.User,
) (string, error) {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return "", err
	}
	defer commands.RollbackTransaction(tx)

	uniqueName, err := generateUniqueBookName(recipeBookJson.Name)
	if err != nil {
		return "", err
	}

	recipeBook, err := commands.CreateRecipeBook(
		tx,
		recipeBookJson.Name,
		uniqueName,
		user.ID,
	)
	if err != nil {
		return "", err
	}

	err = commands.CommitTransaction(tx)
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
