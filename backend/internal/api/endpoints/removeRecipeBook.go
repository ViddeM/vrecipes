package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func RemoveRecipeBook(c *gin.Context) {
	recipeBook, err := validateRecipeBookId(c)
	if err != nil {
		log.Printf("Failed to validate recipe id: %v\n", err)
		return
	}

	err = validateUserAuthorized(c, recipeBook.CreatedBy)
	if err != nil {
		log.Printf("Failed to authorize user %v\n", err)
		c.JSON(http.StatusForbidden, common.Error(common.ResponseIncorrectUser))
		return
	}

	err = process.DeleteRecipeBook(recipeBook)
	if err != nil {
		log.Printf("Failed to delete recipeBook %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToDeleteRecipeBook))
		return
	}

	c.JSON(http.StatusOK, common.Success("Recipe deleted"))
}
