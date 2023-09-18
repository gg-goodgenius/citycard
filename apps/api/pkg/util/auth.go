package myutil

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

var secret []byte

func init() {
	secret = []byte(os.Getenv("AUTH_SECRET"))
}

func CreateAccessToken(userType string, userID int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Audience:  userType,
		Subject:   strconv.FormatInt(userID, 10),
		ExpiresAt: time.Now().Add(time.Hour).Unix(),
	})
	return token.SignedString(secret)
}

func Auth(userType string, tokenString string) (int64, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})
	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.StandardClaims); ok && token.Valid {
		if claims.Audience != userType {
			return 0, fmt.Errorf("token of wrong user type")
		}
		if claims.ExpiresAt > time.Now().Unix() {
			return 0, fmt.Errorf("token is expired")
		}
		strId := claims.Subject
		if strId == "" {
			return 0, fmt.Errorf("no user id with such token")
		}
		id, err := strconv.ParseInt(strId, 10, 64)

		if err != nil {
			return 0, err
		}
		return id, nil
	}

	return 0, err
}

func GenerateRefreshToken() (string, error) {
	b := make([]byte, 32)

	s := rand.NewSource(time.Now().Unix())
	r := rand.New(s)

	_, err := r.Read(b)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", b), nil
}
