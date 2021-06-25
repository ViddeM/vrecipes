package process

import (
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
)

func EditRecipeBook(oldRecipeBook *tables.RecipeBook, newRecipeBook *models.NewRecipeBookJson) (string, error) {
	uniqueName, err := updateRecipeBookGeneral(oldRecipeBook, newRecipeBook)
	if err != nil {
		return "", err
	}

	err = updateRecipeBookRecipes(oldRecipeBook.ID, newRecipeBook.Recipes)
	if err != nil {
		return "", err
	}

	err = updateRecipeBookImages(oldRecipeBook.ID, newRecipeBook.Images)

	return uniqueName, nil
}

func updateRecipeBookGeneral(oldRecipeBook *tables.RecipeBook, newRecipeBook *models.NewRecipeBookJson) (string, error) {
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
		err := commands.UpdateRecipeBook(newRecipeBook.Name, uniqueName, newRecipeBook.Author, oldRecipeBook.ID)
		if err != nil {
			return "", err
		}
	}

	return uniqueName, nil
}

func updateRecipeBookRecipes(bookId uint64, recipes []uint64) error {
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

func recipeWithIdIsInList(id uint64, oldRecipes []*tables.Recipe) bool {
	for _, oldRecipe := range oldRecipes {
		if oldRecipe.ID == id {
			return true
		}
	}

	return false
}

func updateRecipeBookImages(bookId uint64, images []uint64) error {
	oldImages, err := queries.GetImagesForRecipeBook(bookId)
	if err != nil {
		return err
	}

	var handledImages []uint64
	var newImages []uint64
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

func getOldBookImage(image uint64, oldImages []tables.Image) *tables.Image {
	for _, oldImage := range oldImages {
		if image == oldImage.ID {
			return &oldImage
		}
	}

	return nil
}
