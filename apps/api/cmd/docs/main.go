package main

import (
	_ "github.com/santosh/gingo/docs"
	"github.com/santosh/gingo/routes"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	router := routes.SetupRouter()

	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.Run(":8000")
}
