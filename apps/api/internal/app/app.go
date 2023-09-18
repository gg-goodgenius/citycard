package app

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	postgresdb "hack/internal/adapters/db/postgres"
	"hack/internal/composites"
	handler "hack/internal/controllers/http/v1"

	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/env"
	_ "github.com/lib/pq"
	_ "github.com/santosh/gingo/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Run() {
	ctx := context.Background()
	var cfg Config

	err := confita.NewLoader(
		env.NewBackend(),
	).Load(ctx, &cfg)
	if err != nil {
		log.Printf("failed to parse config: %s\n", err)
		return
	}
	dsn := os.Getenv("DATABASE_URL")
	db := postgresdb.NewDatabase(dsn)
	defer db.Close()
	err = postgresdb.Up(os.Getenv("MIGRATIONS_PATH"), dsn)
	if err != nil && err.Error() != "no change" {
		log.Printf("couldn't migrate into database: %s\n", err)
		return
	}

	log.Printf("migrations completed successfully")

	engine := handler.NewRouter()
	healthcheckComposite := composites.NewHealthcheckComposite()
	healthcheckComposite.Handler.Register(engine)

	operatorComposite := composites.NewOperatorComposite(db)
	operatorComposite.Handler.Register(engine)

	userComposite := composites.NewUserComposite(db)
	userComposite.Handler.Register(engine)
	engine.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	srv := http.Server{
		Addr:    fmt.Sprintf(":%s", cfg.Port),
		Handler: engine,
	}

	go func() {
		log.Printf("server started on port %s\n", cfg.Port)
		_ = srv.ListenAndServe()
	}()
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)

	<-stop
	go func() {
		err := postgresdb.Down(os.Getenv("MIGRATIONS_PATH"), dsn)
		if err != nil {
			fmt.Println(err)
		}
		ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()
		_ = srv.Shutdown(ctx)
	}()
}
