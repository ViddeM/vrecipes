package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func CreateNewTag(tagJson *models.NewTagJson, user *tables.User) (*tables.Tag, error) {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return nil, err
	}
	defer commands.RollbackTransaction(tx)

	_, err = queries.GetTagByName(tagJson.Name)
	if err != nil {
		if pgxscan.NotFound(err) == false {
			return nil, err
		}
	} else {
		return nil, common.ErrNameTaken
	}

	tag, err := commands.CreateTag(tx, tagJson.Name, tagJson.Description, *tagJson.Color.R, *tagJson.Color.G, *tagJson.Color.B, user.ID)
	if err != nil {
		return nil, err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return nil, err
	}

	return tag, nil
}
