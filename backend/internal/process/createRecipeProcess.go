package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"strings"
)

func CreateRecipe(
	name string, user *tables.User,
) (*tables.Recipe, error) {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return nil, err
	}
	defer commands.RollbackTransaction(tx)

	uniqueName, err := generateUniqueName(name)
	if err != nil {
		return nil, err
	}

	recipe, err := createRecipe(tx, name, uniqueName, "", "", 0, 0, 0, user.ID)
	if err != nil {
		return nil, err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return nil, err
	}

	return recipe, nil
}

func createRecipe(tx pgx.Tx, name, uniqueName, description, portionsSuffix string, ovenTemp, estimatedTime, portions int, userId uuid.UUID) (*tables.Recipe, error) {
	recipe, err := commands.CreateRecipe(
		tx,
		name,
		uniqueName,
		description,
		portionsSuffix,
		ovenTemp,
		estimatedTime,
		portions,
		userId,
	)

	if err != nil {
		return nil, err
	}

	return recipe, nil
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
