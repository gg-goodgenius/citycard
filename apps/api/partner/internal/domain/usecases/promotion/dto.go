package promotion

type CreatePromotionReqDTO struct {
	UserID    int64  `json:"user_id"`
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
	Name      string `json:"name"`
	Value     string `json:"value"`
}

type CreatePromotionRespDTO struct {
	ID int64 `json:"id"`
}

type ShortPromotionDTO struct {
	ID     int64  `json:"id"`
	UserID int64  `json:"user_id"`
	Name   string `json:"name"`
	Value  string `json:"value"`
}

type MultiplePromotionsDTO struct {
	Promotions []*ShortPromotionDTO `json:"promotions"`
}
