package operator

import "hack/internal/domain/model"

func LoginReqDTOToUser(req LoginReqDTO) model.User {
	return model.User{
		Username: req.Username,
		Password: req.Password,
	}
}
