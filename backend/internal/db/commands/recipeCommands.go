package commands

import (
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"gorm.io/gorm"
)

func CreateRecipe(recipe models.Recipe) func(*gorm.DB) error {
	return func(db *gorm.DB) error {
		return createRecipe(db, recipe)
	}
}

func createRecipe(db *gorm.DB, recipe models.Recipe) error {
	if err := db.Create(&recipe).Error; err != nil {
		return err
	}
	return nil
}