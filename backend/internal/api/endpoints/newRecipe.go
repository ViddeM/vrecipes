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

type NewRecipeResponse struct {
	RecipeUniqueName string `json:"recipeUniqueName"`
}

func NewRecipe(c *gin.Context) {
	var recipe models.NewRecipeJson
	err := c.BindJSON(&recipe)
	if err != nil {
		log.Printf("Failed to validate new recipe json: %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	uniqueName, err := process.CreateNewRecipe(&recipe)
	if err != nil {
		if errors.Is(err, common.ErrRowAlreadyExists) {
			log.Printf("Tried to create duplicate recipe")
			c.JSON(http.StatusOK, common.Error(common.ResponseRecipeNameExist))
			return
		}

		log.Printf("Failed to create new recipe: %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToCreateRecipe))
		return
	}

	c.JSON(http.StatusOK, common.Success(NewRecipeResponse{uniqueName}))
}
