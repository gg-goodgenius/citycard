package mapper

import (
	"hack/internal/domain/entity"
	"hack/internal/domain/model"
)

func SessionModelToEntity(m model.Session) entity.Session {
	return entity.Session{
		Id:           m.Id,
		UserId:       m.UserId,
		RefreshToken: m.RefreshToken,
		ExpiresAt:    m.ExpiresAt,
	}
}

func SessionEntityToModel(m entity.Session) model.Session {
	return model.Session{
		Id:           m.Id,
		UserId:       m.UserId,
		RefreshToken: m.RefreshToken,
		ExpiresAt:    m.ExpiresAt,
	}
}
