package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	myutil "hack/pkg/util"
)

func CheckAuthToken(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No token provided"})
		c.Abort()
		return
	}
	userTypes := []string{"operator", "control", "external", "partner"}

	var id int64
	var err error
	for i := range userTypes {
		if id, err = myutil.Auth(userTypes[i], token); err.Error() != "token of wrong user type" {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to authenticate user: %s", err)})
			c.Abort()
			return
		}
		if id != 0 {
			break
		}
	}
	if id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is not found by token"})
		c.Abort()
		return
	}
	c.Next()
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
