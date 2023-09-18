package postgresdb

import (
	"database/sql"
	"log"
)

func NewDatabase(dsn string) *sql.DB {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Printf("couldn't connect to database: %s\n", err)
		return nil
	}

	err = db.Ping()
	if err != nil {
		log.Printf("couldn't connect to database: %s\n", err)
		return nil
	}
	return db
}
