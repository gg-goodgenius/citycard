package handler

import "github.com/gin-gonic/gin"

type HealthcheckHandler struct{}

func (h *HealthcheckHandler) Register(e *gin.Engine) {
	e.GET("/healthcheck", h.Healthcheck)
}

func (h *HealthcheckHandler) Healthcheck(c *gin.Context) {
	c.Status(200)
}