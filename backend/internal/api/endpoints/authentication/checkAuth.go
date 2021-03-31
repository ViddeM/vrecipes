package authentication

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"log"
)

func CheckAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		envVars := common.GetEnvVars()
		if envVars.AuthEnabled == false && envVars.GinMode == "debug" {
			err := setSession(c, "test", "test", "test", nil)
			if err != nil {
				log.Printf("Failed to set test session: %v", err)
				c.Abort()
				return
			}
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
