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
	_, err := queries.GetTagByName(tagJson.Name)
	if err != nil {
		if pgxscan.NotFound(err) == false {
			return nil, err
		}
	} else {
		return nil, common.ErrNameTaken
	}

	tag, err := commands.CreateTag(tagJson.Name, tagJson.Description, *tagJson.Color.R, *tagJson.Color.G, *tagJson.Color.B, user.ID)
	return tag, err
}
