package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

var ErrNoUserInContext = errors.New("no userID could be extracted from the context")
var ErrInvalidUserIdInContext = errors.New("the userID in the context was of an invalid type")

type NewRecipeJson struct {
	UniqueName string `json:"uniqueName"`
}

func NewRecipe(c *gin.Context) {
	recipeJson, err := validateNewRecipe(c)
	if err != nil {
		log.Printf("Failed to validate new recipe json: %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	user, err := getSessionUser(c)
	if err != nil {
		log.Printf("Failed to retrieve user from context: %v\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseInvalidUserId),
		)
		return
	}

	uniqueName, err := process.CreateNewRecipe(recipeJson, user)
	if err != nil {
		if errors.Is(err, common.ErrNameTaken) {
			log.Printf("Tried to create duplicate recipe")
			c.JSON(
				http.StatusUnprocessableEntity,
				common.Error(common.ResponseRecipeNameExist),
			)
			return
		}

		log.Printf("Failed to create new recipe: %v\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToCreateRecipe),
		)
		return
	}

	c.JSON(
		http.StatusCreated,
		common.Success(NewRecipeJson{UniqueName: uniqueName}),
	)
}

func validateNewRecipe(c *gin.Context) (*models.NewRecipeJson, error) {
	var recipe models.NewRecipeJson
	err := c.ShouldBindJSON(&recipe)
	return &recipe, err
}

var ErrUserNotAuthorized = errors.New("user not authorized")

func validateUserAuthorized(c *gin.Context, userId uuid.UUID) error {
	user, err := getSessionUser(c)
	if err != nil {
		return err
	}

	if user.ID == userId {
		return nil
	}
	return ErrUserNotAuthorized
}

func getSessionUser(c *gin.Context) (*tables.User, error) {
	userId, exists := c.Get("userId")
	if !exists {
		return nil, ErrNoUserInContext
	}

	id, ok := userId.(uuid.UUID)
	if !ok {
		log.Printf("Failed to cast %s to UUID", userId)
		return nil, ErrInvalidUserIdInContext
	}

	return queries.GetUser(id)
}
