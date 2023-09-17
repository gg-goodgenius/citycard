package app

import (
	"context"
	"database/sql"
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

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Printf("couldn't connect to database: %s\n", err)
		return
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Printf("couldn't connect to database: %s\n", err)
		return
	}

	err = postgresdb.Up(os.Getenv("MIGRATIONS_PATH"), dsn)
	if err != nil && err.Error() != "no change" {
		log.Printf("couldn't migrate into database: %s\n", err)
		return
	}

	defer func() {
		err := postgresdb.Down(os.Getenv("MIGRATIONS_PATH"), dsn)
		if err != nil {
			fmt.Println(err)
		}
	}()
	engine := handler.NewRouter()
	// Создаем кастомный обработчик эндпоинтов, который для сервиса S3 и региона ru-central1 выдаст корректный URL
	healthcheckComposite := composites.NewHealthcheckComposite()
	healthcheckComposite.Handler.Register(engine)
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
		ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()
		_ = srv.Shutdown(ctx)
	}()
}
