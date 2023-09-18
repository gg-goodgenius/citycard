from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class POSBase(BaseModel):
    user_id: int
    name: int
    address: str
    lat: float
    lon: float


class POSCreate(POSBase):
    pass


class POSRead(POSBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class POSReadList(BaseModel):
    id: int
    user_id: int
    name: int
    address: str
    lat: float
    lon: float
    model_config = ConfigDict(from_attributes=True)


class POSUpdate(BaseModel):
    user_id: Optional[int]
    name: Optional[int]
    address: Optional[str]
    lat: Optional[float]
    lon: Optional[float]
