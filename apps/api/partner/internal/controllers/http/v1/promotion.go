package handler

import (
	"context"
	"fmt"
	"hack/internal/domain/usecases/promotion"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PromotionHandler struct {
	promotionUseCase PromotionUseCase
}

type PromotionUseCase interface {
	Create(ctx context.Context, req promotion.CreatePromotionReqDTO, userId int64) (promotion.CreatePromotionRespDTO, error)
	Get(ctx context.Context, userId int64) (promotion.MultiplePromotionsDTO, error)
	GetById(ctx context.Context, userId, promotionId int64, userRole string) (promotion.ShortPromotionDTO, error)
}

func NewPromotionHandler(promotionUseCase PromotionUseCase) *PromotionHandler {
	return &PromotionHandler{
		promotionUseCase: promotionUseCase,
	}
}

func (h *PromotionHandler) Register(e *gin.Engine) {
	e.Group("/promotions", CORSMiddleware())
	e.POST("/promotions", h.Create)
	e.GET("/promotions", h.Get)
	e.GET("/promotions/:id", h.GetById)
}

// @Summary Create new promotion
// @Tags promotions
// @Accept  json
// @Produce  json
// @Param input body promotion.CreatePromotionReqDTO{} true "promotion"
// @Success 200 {object} promotion.CreatePromotionRespDTO{}
// @Failure 400 {object} gin.H{}
// @Router /promotion [Post]
func (h *PromotionHandler) Create(c *gin.Context) {
	role := c.Request.Header.Get("role")
	if role != "partner" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user is not a partner"})
		return
	}

	id, err := strconv.ParseInt(c.Request.Header.Get("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse id: %s", err)})
		return
	}

	var req promotion.CreatePromotionReqDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("couldn't bind json: %s", err)})
		return
	}

	resp, err := h.promotionUseCase.Create(c.Request.Context(), req, id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to create promotion: %s", err)})
		return
	}

	c.JSON(http.StatusBadRequest, resp)
}

// @Summary Get all promotions
// @Tags promotions
// @Accept  json
// @Produce  json
// @Success 200 {object} promotion.MultiplePromotionsDTO{}
// @Failure 400 {object} gin.H{}
// @Router /promotion [Get]
func (h *PromotionHandler) Get(c *gin.Context) {
	role := c.Request.Header.Get("role")
	var id int64
	var err error
	if role == "partner" {
		id, err = strconv.ParseInt(c.Request.Header.Get("id"), 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse id: %s", err)})
			return
		}
	}

	resp, err := h.promotionUseCase.Get(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to get all promotions: %s", err)})
		return
	}

	c.JSON(http.StatusBadRequest, resp)
}

// @Summary Get promotion by id
// @Tags promotions
// @Accept  json
// @Produce  json
// @Success 200 {object} promotion.ShortPromotionDTO{}
// @Failure 400 {object} gin.H{}
// @Router /promotion/{id} [Get]
func (h *PromotionHandler) GetById(c *gin.Context) {
	role := c.Request.Header.Get("role")
	var userId int64
	var err error
	if role == "partner" {
		userId, err = strconv.ParseInt(c.Request.Header.Get("id"), 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse id: %s", err)})
			return
		}
	}

	err = c.Request.ParseForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse form: %s", err)})
		return
	}

	promotionId, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("id is of incorrect form: %s", err)})
		return
	}

	resp, err := h.promotionUseCase.GetById(c.Request.Context(), userId, promotionId, role)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to create promotion: %s", err)})
		return
	}

	c.JSON(http.StatusBadRequest, resp)
}

// @Summary Get promotion by id
// @Tags promotions
// @Accept  json
// @Produce  json
// @Success 200 {object} promotion.ShortPromotionDTO{}
// @Failure 400 {object} gin.H{}
// @Router /promotion/{id} [Patch]
// func (h *PromotionHandler) Update(c *gin.Context) {
// 	role := c.Request.Header.Get("role")
// 	var userId int64
// 	var err error
// 	if role == "partner" {
// 		userId, err = strconv.ParseInt(c.Request.Header.Get("id"), 10, 64)
// 		if err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse id: %s", err)})
// 			return
// 		}
// 	}

// 	err = c.Request.ParseForm()
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse form: %s", err)})
// 		return
// 	}

// 	promotionId, err := strconv.ParseInt(c.Param("id"), 10, 64)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("id is of incorrect form: %s", err)})
// 		return
// 	}

// 	resp, err := h.promotionUseCase.GetById(c.Request.Context(), userId, promotionId)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to create promotion: %s", err)})
// 		return
// 	}

// 	c.JSON(http.StatusBadRequest, resp)
// }
