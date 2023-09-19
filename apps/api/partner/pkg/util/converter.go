package myutil

import "time"

func TimeFromString(s string) time.Time {
	t, err := time.Parse("2006-01-02T15:04", s)
	if err != nil {
		return time.Now()
	}
	return t
}
