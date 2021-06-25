package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
	"strconv"
)

func EditRecipeBook(c *gin.Context) {
	recipeBook, err := validateRecipeBook(c)
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
			c.JSON(http.StatusOK, common.Error(common.ResponseRecipeBookNameExists))
			return
		}

		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToEditRecipeBook))
		return
	}

	c.JSON(http.StatusOK, common.Success(NewRecipeBookResponse{uniqueName}))
}

func validateRecipeBookId(c *gin.Context) (*tables.RecipeBook, error) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseMalformedRecipeBookId))
		return nil, err
	}

	recipeBook, err := queries.GetRecipeBookById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, common.Error(common.ResponseRecipeBookNotFound))
		return nil, err
	}

	return recipeBook, nil
}