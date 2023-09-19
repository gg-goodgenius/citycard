import sys

import uvicorn
from core.database import init_db
from core.logging import LOG_FORMAT
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import *
from routers import *

app_op = FastAPI()
app_partner = FastAPI()

app_op.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app_partner.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app_op.on_event("startup")
def startup_event():
    init_db()


@app_op.get("/healthcheck", tags=["Healthcheck"])
def healthcheck():
    return JSONResponse(status_code=200, content={"healthchek": True})


@app_partner.get("/healthcheck", tags=["Healthcheck"])
def healthcheck():
    return JSONResponse(status_code=200, content={"healthchek": True})


app_op.include_router(auth_router)
app_op.include_router(card_router)
app_op.include_router(card_history_router)
app_op.include_router(path_router)
app_partner.include_router(pos_router)
app_partner.include_router(promotion_router)
app_partner.include_router(promotion_condition_router)
app_partner.include_router(target_router)
app_op.include_router(token_router)
app_partner.include_router(user_router)
app_op.include_router(work_router)
app_op.include_router(control_router)
app_op.include_router(partner_router)

if __name__ == "__main__":
    log_config = uvicorn.config.LOGGING_CONFIG
    log_config["formatters"]["access"]["fmt"] = LOG_FORMAT
    log_config["formatters"]["default"]["fmt"] = LOG_FORMAT
    if sys.argv[1] == "op":
        uvicorn.run("main:app_op", host="0.0.0.0", port=9000, reload=True, log_config=log_config)
    if sys.argv[1] == "partner":
        uvicorn.run("main:app_partner", host="0.0.0.0", port=9000, reload=True, log_config=log_config)
