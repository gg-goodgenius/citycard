package postgresdb

type Config struct {
	Host     string `yaml:"host" config:"POSTGRES_HOST"`
	Port     string `yaml:"port" config:"POSTGRES_PORT"`
	DBName   string `yaml:"dbname" config:"POSTGRES_DB"`
	User     string `yaml:"user" config:"POSTGRES_USER"`
	Password string `yaml:"password" config:"POSTGRES_PASSWORD"`
	SSLMode  string `yaml:"ssl_mode" config:"SSLMODE"`
}
