package operator

type LoginReqDTO struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type TokenRespDTO struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiredAt    string `json:"expired_at"`
}

type RefreshTokenReqDTO struct {
	UserID       int64  `json:"id"`
	RefreshToken string `json:"refresh_token"`
}
