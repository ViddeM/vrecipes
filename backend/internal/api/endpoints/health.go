package endpoints

import (
	"github.com/gin-gonic/gin"
	"time"
)

func HealthCheck(c *gin.Context) {
	now := time.Now().Unix()

	c.JSON(200, gin.H{
		"health": "GOOD",
		"time": now,
	})
}