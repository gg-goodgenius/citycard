package composites

import handler "hack/internal/controllers/http/v1"

type HealthcheckComposite struct {
	Handler handler.Handler
}

func NewHealthcheckComposite() *HealthcheckComposite {
	return &HealthcheckComposite{
		Handler: &handler.HealthcheckHandler{},
	}
}
