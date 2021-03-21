package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
)

func Recipe(c *gin.Context) {
	uniqueName := c.Param("uniqueName")
	detailedRecipe, err := process.GetRecipe(uniqueName)
	if err != nil {
		if errors.Is(err, common.ErrNoSuchRecipe) {
			c.JSON(404, common.Error(common.ResponseRecipeNotFound))
			return
		}
		log.Printf("Error: Failed to retrieve recipe %s, due to error: %s\n", uniqueName, err)
		c.JSON(500, common.Error(common.ResponseFailedToRetrieveRecipe))
		return
	}

	c.JSON(200, common.Success(detailedRecipe))
}