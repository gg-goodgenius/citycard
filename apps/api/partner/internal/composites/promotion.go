package composites

import (
	"database/sql"
	postgresdb "hack/internal/adapters/db/postgres"
	handler "hack/internal/controllers/http/v1"
	"hack/internal/domain/service"
	"hack/internal/domain/usecases/promotion"
)

type PromotionComposite struct {
	Handler handler.Handler
}

func NewPromotionComposite(db *sql.DB) *PromotionComposite {
	userRepo := postgresdb.NewPromotionRepository(db)
	userSvc := service.NewPromotionService(userRepo)
	operatorUc := promotion.NewPromotionUseCase(userSvc)
	operatorHandler := handler.NewPromotionHandler(operatorUc)
	return &PromotionComposite{
		Handler: operatorHandler,
	}
}
