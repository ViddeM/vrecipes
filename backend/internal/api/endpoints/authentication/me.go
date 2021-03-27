package authentication

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"net/http"
)

type me struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

func Me(c *gin.Context) {
	sessionData, err := readSession(c)
	 if err != nil {
	 	c.JSON(http.StatusUnauthorized, common.Error(common.ResponseNotAuthorized))
	 	return
	 }

	user, err := queries.GetUser(sessionData.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseInvalidUserId))
		return
	}

	c.JSON(http.StatusOK, common.Success(&me{
		Name: user.Name,
		Email: user.Email,
	}))
}