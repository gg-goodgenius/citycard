package postgresdb

import (
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func Up(migrsPath, dsn string) error {
	m, err := migrate.New(fmt.Sprintf("file://%s", migrsPath), dsn)
	if err != nil {
		return err
	}

	err = m.Up()
	if err != nil {
		return err
	}
	return nil
}

func Down(migrsPath, dsn string) error {
	m, err := migrate.New(
		migrsPath,
		dsn)
	if err != nil {
		return err
	}

	err = m.Down()
	if err != nil {
		return err
	}
	return nil
}
