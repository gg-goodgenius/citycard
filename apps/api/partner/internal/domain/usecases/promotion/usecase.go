package promotion

import (
	"context"
	"fmt"
	"hack/internal/domain/model"
)

type PromotionUseCase struct {
	promotionService PromotionService
}

type PromotionService interface {
	Create(ctx context.Context, m model.Promotion) (int64, error)
	Get(ctx context.Context, userId int64) ([]*model.Promotion, error)
	GetById(ctx context.Context, userId int64) (model.Promotion, error)
}

func NewPromotionUseCase(userService PromotionService) *PromotionUseCase {
	return &PromotionUseCase{
		promotionService: userService,
	}
}

func (uc *PromotionUseCase) Create(ctx context.Context, req CreatePromotionReqDTO, userId int64) (CreatePromotionRespDTO, error) {
	m := CreatePromotionReqDTOToModel(req)
	m.UserID = userId
	id, err := uc.promotionService.Create(ctx, m)
	if err != nil {
		return CreatePromotionRespDTO{}, err
	}
	return CreatePromotionRespDTO{ID: id}, nil
}

func (uc *PromotionUseCase) Get(ctx context.Context, userId int64) (MultiplePromotionsDTO, error) {
	m, err := uc.promotionService.Get(ctx, userId)
	if err != nil {
		return MultiplePromotionsDTO{}, err
	}
	return PromotionModelsToMultiplePromotionsDTO(m), nil
}

func (uc *PromotionUseCase) GetById(ctx context.Context, userId, promotionId int64, userRole string) (ShortPromotionDTO, error) {
	m, err := uc.promotionService.GetById(ctx, promotionId)
	if err != nil {
		return ShortPromotionDTO{}, err
	}

	if m.UserID != userId && userRole != "operator" {
		return ShortPromotionDTO{}, fmt.Errorf("user is not operator and user id is wrong")
	}

	return PromotionModelToShortPromotionDTO(m), nil
}
