package postgresdb

import (
	"context"
	"database/sql"
	"hack/internal/domain/entity"
)

type PromotionRepository struct {
	db *sql.DB
}

func NewPromotionRepository(db *sql.DB) *PromotionRepository {
	return &PromotionRepository{
		db: db,
	}
}

func (r *PromotionRepository) Create(ctx context.Context, ent entity.Promotion) (int64, error) {
	var id int64
	err := r.db.QueryRowContext(ctx, `
		INSERT INTO "promotion" (
			start_date, end_date, 
			name, value, user_id, target_id) 
			VALUES ($1, $2, $3, $4, $5)
	`, ent.StartDate, ent.EndDate,
		ent.UserID, ent.Name, ent.Value).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

func (r *PromotionRepository) Get(ctx context.Context, userId int64) ([]*entity.Promotion, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT * FROM "promotion" 
			WHERE user_id = $1
	`, userId)
	if err != nil {
		return nil, err
	}
	proms := make([]*entity.Promotion, 0, 50)
	var prom *entity.Promotion
	for rows.Next() {
		rows.Scan(prom.ID, prom.StartDate, prom.StartDate)
	}

	return proms, nil
}

func (r *PromotionRepository) GetById(ctx context.Context, promotionId int64) (*entity.Promotion, error) {
	var prom entity.Promotion
	err := r.db.QueryRowContext(ctx, `
		SELECT * FROM "promotion" 
			WHERE promotion_id = $1
	`, promotionId).
		Scan(&prom.ID, &prom.StartDate, &prom.EndDate,
			&prom.UserID, &prom.Name, &prom.Value)
	if err != nil {
		return nil, err
	}
	return &prom, nil
}
