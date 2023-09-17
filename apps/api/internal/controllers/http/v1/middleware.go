package handler

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"

	myutil "hack/pkg/util"
)

func CheckAuthToken(c *gin.Context) {
	uniqueKey := c.Request.Header.Get("App-Key")
	if uniqueKey != "" {
		if uniqueKey != os.Getenv("APP_KEY") {
			c.Status(http.StatusBadRequest)
			c.Abort()
			return
		} else {
			c.Next()
			return
		}
	}
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No token provided"})
		c.Abort()
		return
	}

	if _, err := myutil.AuthAdmin(token); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("Couldn't authorize you: %s", err)})
		c.Abort()
		return
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, App-Key")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PATCH, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
