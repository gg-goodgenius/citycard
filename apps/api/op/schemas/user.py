from datetime import datetime
from typing import Optional

from constants.card import Gender, TypeAction
from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    id: int
    username: str
    email: str
    role: str


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class UserReadList(BaseModel):
    id: int
    username: str
    email: str
    role: str
    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    id: Optional[int]
    username: Optional[str]
    email: Optional[str]
    role: Optional[str]
