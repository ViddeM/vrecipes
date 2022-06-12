package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func Recipe(c *gin.Context) {
	uniqueName := c.Param("uniqueName")
	detailedRecipe, err := process.GetRecipe(uniqueName)
	if err != nil {
		if errors.Is(err, common.ErrNoSuchRecipe) {
			c.JSON(
				http.StatusNotFound,
				common.Error(common.ResponseRecipeNotFound),
			)
			return
		}
		log.Printf(
			"Error: Failed to retrieve recipe %s, due to error: %s\n",
			uniqueName,
			err,
		)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToRetrieveRecipe),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success(detailedRecipe))
}
