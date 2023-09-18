from datetime import datetime
from typing import Optional

from constants.card import Gender, TypeAction
from pydantic import BaseModel, ConfigDict


class WorkBase(BaseModel):
    start_date: datetime
    end_date: datetime
    user_id: int


class WorkCreate(WorkBase):
    pass


class WorkRead(WorkBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class WorkReadList(BaseModel):
    id: int
    start_date: datetime
    end_date: datetime
    user_id: int
    model_config = ConfigDict(from_attributes=True)


class WorkUpdate(BaseModel):
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    user_id: Optional[int]
