package handler

import (
	"fmt"
	"net/http"
	"strconv"

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
	userRoles := []string{"operator", "control", "external", "partner"}

	var id int64
	var err error
	var userRole string
	for i := range userRoles {
		if id, err = myutil.Auth(userRoles[i], token); err.Error() != "token of wrong user type" {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to authenticate user: %s", err)})
			c.Abort()
			return
		}
		if id != 0 {
			userRole = userRoles[i]
			c.Request.Header.Add("role", userRole)
			c.Request.Header.Add("id", strconv.FormatInt(id, 10))
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
