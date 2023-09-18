from datetime import datetime
from typing import Optional

from constants.card import Gender, TypeAction
from constants.user import UserRole
from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    username: str
    email: str
    role: UserRole


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    is_active: bool
    hashed_password: str
    model_config = ConfigDict(from_attributes=True)


class UserReadList(BaseModel):
    id: int
    username: str
    is_active: bool
    email: str
    role: str
    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    id: Optional[int]
    username: Optional[str]
    email: Optional[str]
    is_active: Optional[bool]
    role: Optional[str]
