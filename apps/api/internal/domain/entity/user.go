package entity

type User struct {
	UserID       int64
	Username     string
	Email        string
	Role         string
	PasswordHash string
}
