from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class PathBase(BaseModel):
    work_id: int
    gov_number: str
    path_number: str
    user_id: int
    start_date: datetime
    end_date: datetime


class PathCreate(PathBase):
    pass


class PathRead(PathBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class PathReadList(BaseModel):
    id: int
    work_id: int
    gov_number: str
    path_number: str
    user_id: int
    start_date: datetime
    end_date: datetime
    model_config = ConfigDict(from_attributes=True)


class PathUpdate(BaseModel):
    work_id: Optional[int] = None
    gov_number: Optional[str] = None
    path_number: Optional[str] = None
    user_id: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
