package user

type UserDTO struct {
	UserID   int64  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}
