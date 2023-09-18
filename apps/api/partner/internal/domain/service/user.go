package service

import (
	"context"
	"fmt"
	"hack/internal/domain/entity"
	"hack/internal/domain/mapper"
	"hack/internal/domain/model"
	myutil "hack/pkg/util"
)

type UserService struct {
	userRepository UserRepository
}

type UserRepository interface {
	GetByUsername(ctx context.Context, username string) (entity.User, error)
	GetById(ctx context.Context, userID int64) (entity.User, error)
	GetSessionByUserId(ctx context.Context, userId int64) (entity.Session, error)
	GetSessionByRefreshToken(ctx context.Context, refreshToken string) (entity.Session, error)
	CreateSession(ctx context.Context, ent entity.Session) error
	UpdateSessionByID(ctx context.Context, ent entity.Session) error
}

func NewUserService(userRepository UserRepository) *UserService {
	return &UserService{
		userRepository: userRepository,
	}
}

func (o *UserService) GetById(ctx context.Context, userID int64) (model.User, error) {
	ent, err := o.userRepository.GetById(ctx, userID)
	if err != nil {
		return model.User{}, err
	}
	return mapper.UserEntityToModel(ent), nil
}

func (o *UserService) Login(ctx context.Context, user model.User) (int64, error) {
	ent, err := o.userRepository.GetByUsername(ctx, user.Username)
	if err != nil {
		return -1, fmt.Errorf("failed to find user by username")
	}
	err = myutil.CompareHashAndPassword(user.Password, ent.PasswordHash)
	if err != nil {
		return -1, fmt.Errorf("password mismatch")
	}
	return ent.UserID, nil
}

func (o *UserService) StartSession(ctx context.Context, session model.Session) error {
	sess, err := o.userRepository.GetSessionByUserId(ctx, session.UserId)
	if err != nil {
		return fmt.Errorf(fmt.Sprintf("couldn't get current sessio: %s", err))
	}
	if sess.Id == 0 {
		err = o.userRepository.CreateSession(ctx, mapper.SessionModelToEntity(session))
	} else {
		err = o.userRepository.UpdateSessionByID(ctx, mapper.SessionModelToEntity(session))
	}
	return err
}

func (o *UserService) GetSession(ctx context.Context, refreshToken string) (model.Session, error) {
	sess, err := o.userRepository.GetSessionByRefreshToken(ctx, refreshToken)
	if err != nil {
		return model.Session{}, fmt.Errorf(fmt.Sprintf("couldn't get current session: %s", err))
	}
	return mapper.SessionEntityToModel(sess), nil
}
