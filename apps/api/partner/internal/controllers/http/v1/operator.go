package handler

import (
	"context"
	"fmt"
	"hack/internal/domain/usecases/operator"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OperatorHandler struct {
	operatorUseCase OperatorUseCase
}

type OperatorUseCase interface {
	Login(ctx context.Context, req operator.LoginReqDTO) (operator.TokenRespDTO, error)
	RefreshToken(ctx context.Context, req operator.RefreshTokenReqDTO) (operator.TokenRespDTO, error)
}

func (h *OperatorHandler) Register(e *gin.Engine) {
	e.Group("/operator", CORSMiddleware())
	e.POST("/operator/login", h.Login)
	e.POST("/operator/auth/refresh_token", h.RefreshToken)
}

func NewOperatorHandler(operatorUseCase OperatorUseCase) *OperatorHandler {
	return &OperatorHandler{
		operatorUseCase: operatorUseCase,
	}
}

func (h *OperatorHandler) Login(c *gin.Context) {
	var req operator.LoginReqDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("couldn't bind json: %s", err)})
		return
	}

	resp, err := h.operatorUseCase.Login(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to login: %s", err)})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (h *OperatorHandler) RefreshToken(c *gin.Context) {
	var req operator.RefreshTokenReqDTO

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("couldn't bind json: %s", err)})
		return
	}

	resp, err := h.operatorUseCase.RefreshToken(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to login: %s", err)})
		return
	}

	c.JSON(http.StatusOK, resp)
}
