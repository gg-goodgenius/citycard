package main

import (
	_ "hack/docs"
	"hack/internal/app"
)

// @Title Citycard app
// @Version	1.0
// @Description Service API for city card app
// @Host localhost:8080
// @BasePath /api
func main() {
	app.Run()
}
