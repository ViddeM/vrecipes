package process

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func EditRecipeBook(
	oldRecipeBook *tables.RecipeBook,
	updatedRecipeBook *models.EditRecipeBookJson,
) (string, error) {
	uniqueName, err := updateRecipeBookGeneral(oldRecipeBook, updatedRecipeBook)
	if err != nil {
		return "", err
	}

	err = updateRecipeBookRecipes(oldRecipeBook.ID, updatedRecipeBook.Recipes)
	if err != nil {
		return "", err
	}

	err = updateRecipeBookImages(oldRecipeBook.ID, updatedRecipeBook.Images)

	return uniqueName, nil
}

func updateRecipeBookGeneral(
	oldRecipeBook *tables.RecipeBook,
	newRecipeBook *models.EditRecipeBookJson,
) (string, error) {
	uniqueName := oldRecipeBook.UniqueName
	changed := false
	if oldRecipeBook.Name != newRecipeBook.Name {
		// Need to generate a new uniqueName
		newUniqueName, err := generateUniqueBookName(newRecipeBook.Name)
		if err != nil {
			return "", err
		}
		uniqueName = newUniqueName
		changed = true
	}

	if oldRecipeBook.Author != newRecipeBook.Author {
		changed = true
	}

	if changed {
		err := commands.UpdateRecipeBook(
			newRecipeBook.Name,
			uniqueName,
			newRecipeBook.Author,
			oldRecipeBook.ID,
		)
		if err != nil {
			return "", err
		}
	}

	return uniqueName, nil
}

func updateRecipeBookRecipes(bookId uuid.UUID, recipes []uuid.UUID) error {
	oldRecipes, err := queries.GetRecipesForRecipeBook(bookId)
	if err != nil {
		return err
	}

	for _, recipeId := range recipes {
		if recipeWithIdIsInList(recipeId, oldRecipes) == false {
			// Create the recipeBookRecipe
			_, err := commands.CreateRecipeBookRecipe(bookId, recipeId)
			if err != nil {
				return err
			}
		}
	}

	// Delete any recipes that are no longer in the book
	for _, oldRecipe := range oldRecipes {
		removed := true
		for _, rec := range recipes {
			if oldRecipe.ID == rec {
				removed = false
			}
		}

		if removed {
			err := commands.DeleteRecipeBookRecipe(bookId, oldRecipe.ID)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func recipeWithIdIsInList(id uuid.UUID, oldRecipes []*tables.Recipe) bool {
	for _, oldRecipe := range oldRecipes {
		if oldRecipe.ID == id {
			return true
		}
	}

	return false
}

func updateRecipeBookImages(bookId uuid.UUID, images []uuid.UUID) error {
	oldImages, err := queries.GetImagesForRecipeBook(bookId)
	if err != nil {
		return err
	}

	var handledImages []uuid.UUID
	var newImages []uuid.UUID
	for _, image := range images {
		oldImage := getOldBookImage(image, oldImages)
		if oldImage == nil {
			// The image is new
			newImages = append(newImages, image)
		} else {
			handledImages = append(handledImages, oldImage.ID)
		}
	}

	err = connectImagesToRecipeBook(bookId, newImages)
	if err != nil {
		return err
	}

	for _, oldImage := range oldImages {
		found := false
		for _, handled := range handledImages {
			if oldImage.ID == handled {
				found = true
			}
		}

		if found == false {
			err = commands.DeleteRecipeBookImage(bookId, oldImage.ID)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func getOldBookImage(image uuid.UUID, oldImages []tables.Image) *tables.Image {
	for _, oldImage := range oldImages {
		if image == oldImage.ID {
			return &oldImage
		}
	}

	return nil
}
