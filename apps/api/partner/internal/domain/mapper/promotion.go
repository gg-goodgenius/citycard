package mapper

import (
	"hack/internal/domain/entity"
	"hack/internal/domain/model"
)

func PromotionModelToEntity(m model.Promotion) entity.Promotion {
	return entity.Promotion{
		ID:        m.ID,
		StartDate: m.StartDate,
		EndDate:   m.EndDate,
		UserID:    m.UserID,
		Name:      m.Name,
		Value:     m.Value,
	}
}

func PromotionEntityToModel(ent entity.Promotion) *model.Promotion {
	return &model.Promotion{
		ID:        ent.ID,
		StartDate: ent.StartDate,
		EndDate:   ent.EndDate,
		UserID:    ent.UserID,
		Name:      ent.Name,
		Value:     ent.Value,
	}
}

func PromotionEntitiesToModels(ents []*entity.Promotion) []*model.Promotion {
	ms := make([]*model.Promotion, len(ents))
	for i := range ents {
		ms[i] = PromotionEntityToModel(*ents[i])
	}
	return ms
}
