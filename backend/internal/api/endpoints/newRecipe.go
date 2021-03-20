package endpoints

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func NewRecipe(c *gin.Context) {
	c.String(http.StatusInternalServerError, "Not implemented")
}
