package endpoints

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

type ExportDataRequest struct {
	Recipes        []uuid.UUID `json:"recipes"`
	Tags           []uuid.UUID `json:"tags"`
	RecipeBooks    []uuid.UUID `json:"recipeBooks"`
	DestinationUrl string      `json:"destinationUrl" binding:"required"`
}

type SetupExportResponse struct {
	DestinationUrl string `json:"destinationUrl"`
}

func SetupExportData(c *gin.Context) {
	var req ExportDataRequest
	err := c.ShouldBindJSON(&req)
	if err != nil {
		log.Printf("Failed to validate export data request json: %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	exportId, err := process.SetupExportData(req.Recipes, req.Tags, req.RecipeBooks)
	if err != nil {
		log.Printf("Failed to export data, err: %v", err)
		if errors.Is(err, common.ErrNoSuchRecipe) {
			c.JSON(http.StatusUnprocessableEntity, common.Error(common.ResponseRecipeNotFound))
			return
		}
		if errors.Is(err, common.ErrNoSuchTag) {
			c.JSON(http.StatusUnprocessableEntity, common.Error(common.ResponseTagNotFound))
			return
		}
		if errors.Is(err, common.ErrNoSuchRecipeBook) {
			c.JSON(http.StatusUnprocessableEntity, common.Error(common.ResponseRecipeBookNotFound))
			return
		}

		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToExportData))
		return
	}

	var destinationUrl = fmt.Sprintf("%s%s?%s=%s%s/%s", req.DestinationUrl, ImportDataEndpoint, ImportDataUrlQueryParam, common.GetEnvVars().BackendAddress, GetExportDataEndpoint, exportId)

	c.JSON(http.StatusOK, common.Success(SetupExportResponse{DestinationUrl: destinationUrl}))
}
