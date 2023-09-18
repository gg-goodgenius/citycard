package user

import "hack/internal/domain/model"

func ModelToUserDTO(m model.User) UserDTO {
	return UserDTO{
		UserID:   m.UserID,
		Username: m.Username,
		Email:    m.Email,
		Role:     m.Role,
	}
}
