package user

import (
	"context"
	"hack/internal/domain/model"
)

type UserUseCase struct {
	userService UserService
}

type UserService interface {
	GetById(ctx context.Context, userID int64) (model.User, error)
}

func NewUserUseCase(userService UserService) *UserUseCase {
	return &UserUseCase{
		userService: userService,
	}
}

func (uc *UserUseCase) GetById(ctx context.Context, userID int64) (UserDTO, error) {
	user, err := uc.userService.GetById(ctx, userID)
	if err != nil {
		return UserDTO{}, err
	}
	return ModelToUserDTO(user), nil
}
