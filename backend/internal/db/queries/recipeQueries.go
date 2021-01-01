package queries

import (
	"errors"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"gorm.io/gorm"
)

func GetRecipeByName(uniqueName string, output *models.Recipe, found *bool) func(*gorm.DB) error {
	return func(db *gorm.DB) error {
		return getRecipeByName(db, uniqueName, output, found)
	}
}

func getRecipeByName(db *gorm.DB, uniqueName string, output *models.Recipe, found *bool) error {
	var recipe *models.Recipe
	result := db.Where("UniqueName = ?", uniqueName).First(&recipe)
	f := true

	err := result.Error
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			f = false
			err = nil
		}
	}
	found = &f
	output = recipe
	return err
}