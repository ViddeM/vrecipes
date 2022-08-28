package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func DeleteTag(tag *tables.Tag) error {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return err
	}
	defer commands.RollbackTransaction(tx)

	err = commands.DeleteRecipeTagsByTagId(tx, tag.ID)
	if err != nil {
		return err
	}

	err = commands.DeleteTag(tx, tag.ID)
	if err != nil {
		return err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return err
	}

	return nil
}
