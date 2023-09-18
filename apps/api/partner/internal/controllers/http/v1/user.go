package handler

import (
	"context"
	"fmt"
	"hack/internal/domain/usecases/user"
	myutil "hack/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userUseCase UserUseCase
}

type UserUseCase interface {
	GetById(ctx context.Context, userId int64) (user.UserDTO, error)
}

func (h *UserHandler) Register(e *gin.Engine) {
	e.Group("/me", CORSMiddleware())
	e.GET("/me", h.GetById)
}

func NewUserHandler(userUseCase UserUseCase) *UserHandler {
	return &UserHandler{
		userUseCase: userUseCase,
	}
}

func (h *UserHandler) GetById(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "token is not provided"})
		return
	}
	userTypes := []string{"operator", "control", "external", "partner"}

	var id int64
	var err error
	for i := range userTypes {
		if id, err = myutil.Auth(userTypes[i], token); err != nil && err.Error() != "token of wrong user type" {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to authenticate user: %s", err)})
			return
		}
		fmt.Println(err)
		fmt.Println(userTypes[i], id)
		if id != 0 {
			break
		}
	}
	if id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is not found by token"})
		return
	}

	resp, err := h.userUseCase.GetById(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to login: %s", err)})
		return
	}

	c.JSON(http.StatusOK, resp)
}
