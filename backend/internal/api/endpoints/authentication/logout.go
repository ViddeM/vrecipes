package authentication

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Logout(c *gin.Context) {
	resetSession(c)
	c.String(http.StatusOK, "You have been logged out")
}
