package authentication

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"log"
	"net/http"
)

type me struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

func Me(c *gin.Context) {
	sessionData, err := readSession(c)
	 if err != nil {
		 log.Printf("Failed to read user from session: %v\n", err)
	 	c.JSON(http.StatusUnauthorized, common.Error(common.ResponseNotAuthorized))
	 	return
	 }

	user, err := queries.GetUser(sessionData.UserID)
	if err != nil {
		log.Printf("Failed to get user from db: %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseInvalidUserId))
		return
	}

	c.JSON(http.StatusOK, common.Success(&me{
		Name: user.Name,
		Email: user.Email,
	}))
}