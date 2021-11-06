package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/models"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func NewTag(c *gin.Context) {
	tagJson, err := validateTag(c)
	if err != nil {
		log.Printf("Failed to validate new tag %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	user, err := getSessionUser(c)
	if err != nil {
		log.Printf("Failed to retrieve user from context %s\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseInvalidUserId))
		return
	}

	_, err = process.CreateNewTag(tagJson, user)
	if err != nil {
		if errors.Is(err, common.ErrNameTaken) {
			c.JSON(http.StatusUnprocessableEntity, common.Error(common.ResponseTagNameTaken))
			return
		}
		log.Printf("Failed creating tag %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToCreateTag))
		return
	}

	c.JSON(http.StatusCreated, common.Success(nil))
}

func validateTag(c *gin.Context) (*models.NewTagJson, error) {
	var tag models.NewTagJson
	err := c.ShouldBindJSON(&tag)

	return &tag, err
}
