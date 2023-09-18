from datetime import datetime
from typing import Optional

from constants.card import Gender, TypeAction
from pydantic import BaseModel, ConfigDict


class TokenBase(BaseModel):
    __tablename__ = "token"

    id: int

    name: str
    value: str


class TokenCreate(TokenBase):
    pass


class TokenRead(TokenBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class TokenReadList(BaseModel):
    id: int
    name: str
    value: str
    model_config = ConfigDict(from_attributes=True)


class TokenUpdate(BaseModel):
    id: Optional[int]
    name: Optional[str]
    value: Optional[str]
