package endpoints

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
)

func Recipe(c *gin.Context) {
	uniqueName := c.Param("uniqueName")
	detailedRecipe, err := process.GetRecipe(uniqueName)
	if err != nil {
		if errors.Is(err, common.NoSuchRecipe) {
			c.JSON(404, common.Error(fmt.Sprintf("No recipe with unique name %s", uniqueName)))
			return
		}
		log.Printf("Error: Failed to retrieve recipe %s, due to error: %s\n", uniqueName, err)
		c.JSON(500, common.Error(fmt.Sprintf("Failed to retrieve recipe with name %s", uniqueName)))
		return
	}

	c.JSON(200, common.Success(detailedRecipe))
}