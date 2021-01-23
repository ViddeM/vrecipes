package endpoints

import (
	"github.com/gin-gonic/gin"
	"log"
)

func Recipe(c *gin.Context) {
	uniqueName := c.Param("uniqueName")
	log.Fatalf("Not implemented, param: %s", uniqueName)
}