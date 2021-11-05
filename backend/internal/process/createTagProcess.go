package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func CreateNewTag(tagJson *models.NewTagJson) (*tables.Tag, error) {
	_, err := queries.GetTagByName(tagJson.Name)
	if err != nil && !pgxscan.NotFound(err) {
		return nil, err
	}

	tag, err := commands.CreateTag(tagJson.Name, tagJson.Description, tagJson.Color.R, tagJson.Color.G, tagJson.Color.B)
	return tag, err
}
