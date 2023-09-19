package service

import (
	"context"
	"hack/internal/domain/entity"
	"hack/internal/domain/mapper"
	"hack/internal/domain/model"
)

type PromotionService struct {
	promotionRepository PromotionRepository
}

type PromotionRepository interface {
	Create(ctx context.Context, m entity.Promotion) (int64, error)
	Get(ctx context.Context, userId int64) ([]*entity.Promotion, error)
	GetById(ctx context.Context, id int64) (*entity.Promotion, error)
}

func NewPromotionService(promotionRepository PromotionRepository) *PromotionService {
	return &PromotionService{
		promotionRepository: promotionRepository,
	}
}

func (s *PromotionService) Create(ctx context.Context, m model.Promotion) (int64, error) {
	id, err := s.promotionRepository.Create(ctx, mapper.PromotionModelToEntity(m))
	if err != nil {
		return 0, err
	}
	return id, err
}

func (s *PromotionService) Get(ctx context.Context, userId int64) ([]*model.Promotion, error) {
	ents, err := s.promotionRepository.Get(ctx, userId)
	if err != nil {
		return nil, err
	}
	return mapper.PromotionEntitiesToModels(ents), nil
}

func (s *PromotionService) GetById(ctx context.Context, promotionId int64) (model.Promotion, error) {
	ent, err := s.promotionRepository.GetById(ctx, promotionId)
	if err != nil {
		return model.Promotion{}, err
	}
	return *mapper.PromotionEntityToModel(*ent), err
}
