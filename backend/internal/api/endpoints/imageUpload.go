package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"log"
	"net/http"
)

func ImageUpload(c *gin.Context) {
	formFile, formHeader, err := c.Request.FormFile("file")
	if err != nil {
		log.Printf("Failed to retrieve file from form: %v", err)
		c.JSON(http.StatusBadRequest, common.Error("Invalid image upload"))
		return
	}

	image, err := validation.ValidateFile(&formFile, formHeader)
	if err != nil {
		log.Printf("Failed to validate image: %v", err)
		c.JSON(http.StatusBadRequest, common.Error("Bad image"))
		return
	}

	imageJson, err := process.UploadImage(image)
	if err != nil {
		log.Printf("Failed to handle image upload: %v", err)
		c.JSON(http.StatusInternalServerError, common.Error("Failed to handle image"))
		return
	}

	c.JSON(http.StatusOK, common.Success(imageJson))
}