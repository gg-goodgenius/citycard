package handler

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	router := gin.Default()
	router.Use(CORSMiddleware())
	return router
}

type Handler interface {
	Register(*gin.Engine)
}
