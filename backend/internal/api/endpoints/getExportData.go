package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"net/http"
)

const GetExportDataEndpoint = "/export"

func GetExportData(c *gin.Context) {
	exportIdStr := c.Param("id")
	exportId, err := uuid.Parse(exportIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseMalformedExportId))
		return
	}

	data, err := process.GetExportDataById(exportId)
	if err != nil {
		if errors.Is(err, common.ErrExportDataNotFound) {
			c.JSON(http.StatusNotFound, common.Error(common.ResponseExportDataNotFound))
			return
		}

		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToGetExportData))
		return
	}

	c.JSON(http.StatusOK, common.Success(data))
	return
}
