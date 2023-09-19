package promotion

import (
	"hack/internal/domain/model"
	myutil "hack/pkg/util"
)

func CreatePromotionReqDTOToModel(req CreatePromotionReqDTO) model.Promotion {
	return model.Promotion{
		UserID:    req.UserID,
		Name:      req.Name,
		StartDate: myutil.TimeFromString(req.StartDate),
		EndDate:   myutil.TimeFromString(req.EndDate),
		Value:     req.Value,
	}
}

func PromotionModelToShortPromotionDTO(m model.Promotion) ShortPromotionDTO {
	return ShortPromotionDTO{
		ID:     m.ID,
		UserID: m.UserID,
		Name:   m.Name,
		Value:  m.Value,
	}
}

func PromotionModelsToMultiplePromotionsDTO(req []*model.Promotion) MultiplePromotionsDTO {
	dto := MultiplePromotionsDTO{}
	dto.Promotions = make([]*ShortPromotionDTO, len(req))
	for i := range req {
		*dto.Promotions[i] = PromotionModelToShortPromotionDTO(*req[i])
	}
	return dto
}
