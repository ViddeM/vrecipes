package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func RecipeBook(c *gin.Context) {
	uniqueName := c.Param("uniqueName")
	detailedRecipeBook, err := process.GetRecipeBook(uniqueName)
	if err != nil {
		if errors.Is(err, common.ErrNoSuchRecipeBook) {
			c.JSON(
				http.StatusNotFound,
				common.Error(common.ResponseRecipeBookNotFound),
			)
		}
		log.Printf(
			"Error: Failed to retrieve recipebook %s, due to error: %v\n",
			uniqueName,
			err,
		)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToRetrieveRecipeBook),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success(detailedRecipeBook))
}
