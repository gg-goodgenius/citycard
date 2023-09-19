from datetime import datetime
from typing import Optional

from constants.card import Gender, TypeAction
from pydantic import BaseModel, ConfigDict


class TargetBase(BaseModel):
    id: int

    city: str
    min_age: int
    max_age: int
    gender: str


class TargetCreate(TargetBase):
    pass


class TargetRead(TargetBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class TargetReadList(BaseModel):
    id: int
    city: str
    min_age: int
    max_age: int
    gender: str
    model_config = ConfigDict(from_attributes=True)


class TargetUpdate(BaseModel):
    id: Optional[int] = None
    city: Optional[str] = None
    min_age: Optional[int] = None
    max_age: Optional[int] = None
    gender: Optional[str] = None
