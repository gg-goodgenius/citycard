package composites

import (
	"database/sql"
	postgresdb "hack/internal/adapters/db/postgres"
	handler "hack/internal/controllers/http/v1"
	"hack/internal/domain/service"
	"hack/internal/domain/usecases/user"
)

type UserComposite struct {
	Handler handler.Handler
}

func NewUserComposite(db *sql.DB) *UserComposite {
	userRepo := postgresdb.NewUserRepository(db)
	userSvc := service.NewUserService(userRepo)
	operatorUc := user.NewUserUseCase(userSvc)
	operatorHandler := handler.NewUserHandler(operatorUc)
	return &UserComposite{
		Handler: operatorHandler,
	}
}
