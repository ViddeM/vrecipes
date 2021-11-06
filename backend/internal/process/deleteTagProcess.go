package process

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func DeleteTag(tag *tables.Tag) error {
	deletedName := fmt.Sprintf("%s_%s_deleted", tag.Name, tag.ID)

	return commands.TagSetDeleted(deletedName, tag.ID)
}
