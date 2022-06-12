package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func Tags(c *gin.Context) {
	tags, err := process.GetTags()
	if err != nil {
		log.Printf("Error: Failed to retrieve tags due to %s\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToRetrieveTags),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success(tags))
}
