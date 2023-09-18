package postgresdb

import (
	"context"
	"database/sql"
	"hack/internal/domain/entity"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (u *UserRepository) GetByUsername(ctx context.Context, username string) (entity.User, error) {
	var user entity.User
	err := u.db.QueryRowContext(ctx, `
		SELECT * 
			FROM users WHERE username=$1	
	`, username).Scan(&user.UserID, &user.Username, &user.Email, &user.Role, &user.PasswordHash)
	if err != nil {
		return entity.User{}, err
	}
	return user, nil
}

func (u *UserRepository) GetById(ctx context.Context, userId int64) (entity.User, error) {
	var user entity.User
	err := u.db.QueryRowContext(ctx, `
		SELECT * 
			FROM users WHERE user_id=$1	
	`, userId).Scan(&user.UserID, &user.Username, &user.Email, &user.Role, &user.PasswordHash)
	if err != nil {
		return entity.User{}, err
	}
	return user, nil
}
