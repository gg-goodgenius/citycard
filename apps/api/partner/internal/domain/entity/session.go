package entity

type Session struct {
	Id           int64
	UserId       int64
	RefreshToken string
	ExpiresAt    int64
}
