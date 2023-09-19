package handler

import (
	"context"
	"fmt"
	"hack/internal/domain/usecases/operator"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PartnerHandler struct {
	partnerUseCase PartnerUseCase
}

type PartnerUseCase interface {
	Login(ctx context.Context, req operator.LoginReqDTO) (operator.TokenRespDTO, error)
}

func NewPartnerHandler(partnerUseCase PartnerUseCase) *PartnerHandler {
	return &PartnerHandler{
		partnerUseCase: partnerUseCase,
	}
}

// ref: https://swaggo.github.io/swaggo.io/declarative_comments_format/api_operation.html
// @Summary Show an account
// @Description get string by ID
// @Tags accounts
// @Accept  json
// @Produce  json
// @Param id path string true "Account ID"
// @Success 200 {object} model.Account
// @Failure 400 {object} model.HTTPError
// @Router /accounts/{id} [get]
func (h *PartnerHandler) Login(c *gin.Context) {
	var req operator.LoginReqDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("couldn't bind json: %s", err)})
		return
	}

	resp, err := h.partnerUseCase.Login(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to login: %s", err)})
		return
	}

	c.JSON(http.StatusOK, resp)
}
