package process

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

type RecipeBooksJson struct {
	RecipeBooks []ShortRecipeBookJson `json:"recipeBooks"`
}

type ShortRecipeBookJson struct {
	ID         uint64      `json:"id"`
	Name       string      `json:"name"`
	UniqueName string      `json:"uniqueName"`
	Author     string      `json:"author"`
	ImageLink  string      `json:"imageLink"`
	UploadedBy tables.User `json:"uploadedBy"`
}

func toShortRecipeBookJson(recipeBook *tables.RecipeBook, user *tables.User, imageUrl string) ShortRecipeBookJson {
	return ShortRecipeBookJson{
		ID:         recipeBook.ID,
		Name:       recipeBook.Name,
		UniqueName: recipeBook.UniqueName,
		Author:     recipeBook.Author,
		ImageLink:  imageUrl,
		UploadedBy: *user,
	}
}

func GetRecipeBooks() (*RecipeBooksJson, error) {
	recipeBooks, err := queries.GetNonDeletedRecipeBooks()
	if err != nil {
		return nil, err
	}

	if recipeBooks == nil {
		recipeBooks = make([]*tables.RecipeBook, 0)
	}

	shortRecipeBooks := make([]ShortRecipeBookJson, 0)
	for _, book := range recipeBooks {
		image, err := queries.GetImageForRecipeBook(book.ID)

		imageUrl := ""
		if err != nil {
			if pgxscan.NotFound(err) == false {
				return nil, err
			}
		} else {
			imageUrl = imageNameToPath(image.ID, image.Name)
		}

		user, err := queries.GetUser(book.CreatedBy)
		if err != nil {
			return nil, err
		}

		shortRecipeBooks = append(shortRecipeBooks, toShortRecipeBookJson(book, user, imageUrl))
	}

	return &RecipeBooksJson{
		RecipeBooks: shortRecipeBooks,
	}, nil
}
