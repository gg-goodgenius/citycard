package composites

import (
	"database/sql"
	postgresdb "hack/internal/adapters/db/postgres"
	handler "hack/internal/controllers/http/v1"
	"hack/internal/domain/service"
	"hack/internal/domain/usecases/operator"
)

type OperatorComposite struct {
	Handler handler.Handler
}

func NewOperatorComposite(db *sql.DB) *OperatorComposite {
	userRepo := postgresdb.NewUserRepository(db)
	userSvc := service.NewUserService(userRepo)
	operatorUc := operator.NewOperatorUseCase(userSvc)
	operatorHandler := handler.NewOperatorHandler(operatorUc)
	return &OperatorComposite{
		Handler: operatorHandler,
	}
}
