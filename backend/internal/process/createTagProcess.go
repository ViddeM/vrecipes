package process

import (
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func CreateNewTag(tagJson *models.NewTagJson) (*tables.Tag, error) {
	_, err := queries.GetTagByName(tagJson.Name)
	if err != nil {
		return nil, common2.ErrNameTaken
	}

	tag, err := commands.CreateTag(tagJson.Name, tagJson.Description, tagJson.Color.R, tagJson.Color.G, tagJson.Color.B)
	return tag, err
}
