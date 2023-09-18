package postgresdb

import (
	"context"
	"database/sql"
	"hack/internal/domain/entity"
)

func (u *UserRepository) GetSessionByUserId(ctx context.Context, userId int64) (entity.Session, error) {
	var session entity.Session
	err := u.db.QueryRowContext(ctx, `
		SELECT * FROM refresh_sessions WHERE user_id = $1	
	`, userId).Scan(&session.Id, &session.RefreshToken, &session.ExpiresAt, &session.UserId)
	switch {
	case err == sql.ErrNoRows:
		return entity.Session{}, nil
	case err != nil:
		return entity.Session{}, err
	}
	return session, nil
}

func (u *UserRepository) GetSessionByRefreshToken(ctx context.Context, refreshToken string) (entity.Session, error) {
	var session entity.Session
	err := u.db.QueryRowContext(ctx, `
		SELECT * FROM refresh_sessions 
			WHERE refresh_token = $1	
	`, refreshToken).Scan(&session.Id, &session.RefreshToken, &session.ExpiresAt, &session.UserId)
	if err != nil {
		return entity.Session{}, err
	}
	return session, nil
}

func (u *UserRepository) CreateSession(ctx context.Context, session entity.Session) error {
	_, err := u.db.QueryContext(ctx, `
		INSERT INTO refresh_sessions (refresh_token, expires_at, user_id)
			VALUES ($1,$2,$3)
	`, session.RefreshToken, session.ExpiresAt, session.UserId)
	if err != nil {
		return err
	}
	return nil
}

func (u *UserRepository) UpdateSessionByID(ctx context.Context, session entity.Session) error {
	_, err := u.db.QueryContext(ctx, `
		UPDATE refresh_sessions 
			SET refresh_token = $1, expires_at = $2, user_id = $3 
				WHERE refresh_session_id = $4 
	`, session.RefreshToken, session.ExpiresAt, session.UserId, session.Id)
	if err != nil {
		return err
	}
	return nil
}
