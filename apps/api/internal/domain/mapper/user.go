package mapper

import (
	"hack/internal/domain/entity"
	"hack/internal/domain/model"
)

func UserModelToEntity(m model.User) entity.User {
	return entity.User{
		UserID:   m.UserID,
		Username: m.Username,
		Email:    m.Email,
		Role:     m.Role,
	}
}

func UserEntityToModel(e entity.User) model.User {
	return model.User{
		UserID:   e.UserID,
		Username: e.Username,
		Email:    e.Email,
		Role:     e.Role,
	}
}
