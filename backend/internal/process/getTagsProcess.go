package process

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

type TagsJson struct {
	Tags []TagJson `json:"tags"`
}

type TagJson struct {
	ID          uuid.UUID        `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Color       models.ColorJson `json:"color"`
	Author      tables.User      `json:"author"`
}

func GetTags() (*TagsJson, error) {
	tags, err := queries.GetNonDeletedTags()
	if err != nil {
		return nil, err
	}

	if tags == nil {
		tags = make([]*tables.Tag, 0)
	}

	tagJsons := make([]TagJson, 0)
	for _, tag := range tags {
		user, err := queries.GetUser(tag.CreatedBy)
		if err != nil {
			return nil, err
		}

		tagJsons = append(tagJsons, TagJson{
			ID:          tag.ID,
			Name:        tag.Name,
			Description: tag.Description,
			Color: models.ColorJson{
				R: &tag.ColorRed,
				G: &tag.ColorGreen,
				B: &tag.ColorBlue,
			},
			Author: *user,
		})
	}

	return &TagsJson{
		Tags: tagJsons,
	}, nil
}
