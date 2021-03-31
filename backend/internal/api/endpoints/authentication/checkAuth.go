package authentication

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func CheckAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		envVars := common.GetEnvVars()
		if envVars.AuthEnabled == false && envVars.GinMode == "debug" {
			user, err := process.GetOrCreateUser("test", "test", "test")
			if err != nil {
				c.JSON(http.StatusInternalServerError, common.Error(common.ResponseNotAuthorized))
				return
			}
			c.Set("userId", user.ID)
			return
		}

		session := sessions.Default(c)
		token := session.Get("token")

		if token == nil {
			renewAuth(c)
			c.Abort()
			return
		}

		sessionData, err := readSession(c)
		if err != nil {
			log.Printf("Failed to read session: %v\n", err)
			renewAuth(c)
			c.Abort()
			return
		}

		c.Set("userId", sessionData.UserID)
	}
}
