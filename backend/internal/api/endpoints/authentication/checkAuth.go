package authentication

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
)

func CheckAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		token := session.Get("token")

		if token == nil {
			renewAuth(c)
			c.Abort()
			return
		}

		_, err := readSession(c)
		if err != nil {
			log.Printf("Failed to read session: %v\n", err)
			renewAuth(c)
			c.Abort()
			return
		}
	}
}
