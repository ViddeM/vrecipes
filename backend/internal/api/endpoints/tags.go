package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
)

func Tags(c *gin.Context) {
	tags, err := process.GetTags()
	if err != nil {
		log.Printf("Error: Failed to retrieve tags due to %s\n", err)
		c.JSON(500, common.ResponseFailedToRetrieveTags)
		return
	}

	c.JSON(200, common.Success(tags))
}
