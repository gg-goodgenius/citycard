package entity

import "time"

type Promotion struct {
	ID        int64
	StartDate time.Time
	EndDate   time.Time
	UserID    int64
	Name      string
	Value     string
}
