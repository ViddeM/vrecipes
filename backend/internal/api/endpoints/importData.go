package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

const ImportDataEndpoint = "/import"
const ImportDataUrlQueryParam = "data_url"

func ImportData(c *gin.Context) {
	url := c.Query(ImportDataUrlQueryParam)

	user, err := getSessionUser(c)
	if err != nil {
		log.Printf("Failed to retrieve user from context, err: %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseInvalidUserId))
	}

	err = process.ImportData(url, user)
}
