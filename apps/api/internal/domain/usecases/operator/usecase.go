package operator

import (
	"context"
	"fmt"
	"hack/internal/domain/model"
	myutil "hack/pkg/util"
	"time"
)

type OperatorUseCase struct {
	userService UserService
}

type UserService interface {
	Login(ctx context.Context, user model.User) (int64, error)
	StartSession(ctx context.Context, session model.Session) error
	GetSession(ctx context.Context, refreshToken string) (model.Session, error)
}

func NewOperatorUseCase(userService UserService) *OperatorUseCase {
	return &OperatorUseCase{
		userService: userService,
	}
}

func (uc *OperatorUseCase) Login(ctx context.Context, req LoginReqDTO) (TokenRespDTO, error) {
	userID, err := uc.userService.Login(ctx, LoginReqDTOToUser(req))
	if err != nil {
		return TokenRespDTO{}, err
	}
	accessToken, err := myutil.CreateAccessToken("operator", userID)
	if err != nil {
		return TokenRespDTO{}, err
	}
	refreshToken, err := myutil.GenerateRefreshToken()

	if err != nil {
		return TokenRespDTO{}, err
	}
	err = uc.userService.StartSession(ctx, model.Session{
		UserId:       userID,
		RefreshToken: refreshToken,
		ExpiresAt:    time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	if err != nil {
		return TokenRespDTO{}, fmt.Errorf(fmt.Sprintf("couldn't start new session: %s", err))
	}

	return TokenRespDTO{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiredAt:    time.Now().Add(time.Hour).Format("2006-01-02"),
	}, nil
}

func (uc *OperatorUseCase) RefreshToken(ctx context.Context, req RefreshTokenReqDTO) (TokenRespDTO, error) {
	sess, err := uc.userService.GetSession(ctx, req.RefreshToken)
	if err != nil {
		return TokenRespDTO{}, err
	}

	if sess.ExpiresAt > time.Now().Unix() {
		return TokenRespDTO{}, fmt.Errorf("session expired")
	}

	if sess.Id != req.UserID {
		return TokenRespDTO{}, fmt.Errorf("user id mismatch")
	}

	accessToken, err := myutil.CreateAccessToken("operator", sess.Id)
	if err != nil {
		return TokenRespDTO{}, err
	}
	refreshToken, err := myutil.GenerateRefreshToken()

	if err != nil {
		return TokenRespDTO{}, err
	}

	err = uc.userService.StartSession(ctx, model.Session{
		Id:           sess.Id,
		RefreshToken: refreshToken,
		ExpiresAt:    time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	if err != nil {
		return TokenRespDTO{}, fmt.Errorf("couldn't start new session")
	}
	return TokenRespDTO{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiredAt:    time.Now().Add(time.Hour).Format("2006-01-02"),
	}, nil
}
