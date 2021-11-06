package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func RemoveTag(c *gin.Context) {
	tag, err := validateTagId(c)
	if err != nil {
		log.Printf("Failed to validate tag id: %v\n", err)
		return
	}

	err = validateUserAuthorized(c, tag.CreatedBy)
	if err != nil {
		log.Printf("Failed to authorize user: %v\n", err)
		c.JSON(http.StatusForbidden, common.Error(common.ResponseIncorrectUser))
		return
	}

	err = process.DeleteTag(tag)
	if err != nil {
		log.Printf("Failed to delete tag: %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToDeleteTag))
		return
	}

	c.JSON(http.StatusOK, common.Success("Tag deleted"))
}
