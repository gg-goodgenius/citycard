package app

import (
	postgresdb "hack/internal/adapters/db/postgres"
)

type Config struct {
	Host string `yaml:"host" config:"HOST"`
	Port string `yaml:"port" config:"PORT"`

	Postgres postgresdb.Config
}
