package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"github.com/viddem/vrecipes/backend/internal/process"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"log"
	"net/http"
)

type EditRecipeBookResponseJson struct {
	UniqueName string `json:"uniqueName"`
}

func EditRecipeBook(c *gin.Context) {
	recipeBook, err := validateEditRecipeBook(c)
	if err != nil {
		log.Printf("Failed to validate edit recipe book json %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	oldRecipeBook, err := validateRecipeBookId(c)
	if err != nil {
		log.Printf("Failed to validate recipe id: %v\n", err)
		return
	}

	err = validateUserAuthorized(c, oldRecipeBook.CreatedBy)
	if err != nil {
		log.Printf("User not authorized to edit recipebook: %v\n", err)
		c.JSON(http.StatusForbidden, common.Error(common.ResponseIncorrectUser))
		return
	}

	uniqueName, err := process.EditRecipeBook(oldRecipeBook, recipeBook)
	if err != nil {
		log.Printf("Failed to edit recipebook: %v\n", err)
		if errors.Is(err, common.ErrNameTaken) {
			c.JSON(
				http.StatusUnprocessableEntity,
				common.Error(common.ResponseRecipeBookNameExists),
			)
			return
		}

		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToEditRecipeBook),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success(EditRecipeBookResponseJson{uniqueName}))
}

func validateRecipeBookId(c *gin.Context) (*tables.RecipeBook, error) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			common.Error(common.ResponseMalformedRecipeBookId),
		)
		return nil, err
	}

	recipeBook, err := queries.GetRecipeBookById(id)
	if err != nil {
		c.JSON(
			http.StatusNotFound,
			common.Error(common.ResponseRecipeBookNotFound),
		)
		return nil, err
	}

	return recipeBook, nil
}

func validateEditRecipeBook(c *gin.Context) (
	*models.EditRecipeBookJson,
	error,
) {
	var recipeBook models.EditRecipeBookJson
	err := c.BindJSON(&recipeBook)
	if err != nil {
		return nil, err
	}

	err = validation.ValidateRecipeBook(&recipeBook)
	return &recipeBook, err
}
