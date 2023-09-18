from datetime import datetime
from typing import Optional

from constants import Gender, TypeAction
from pydantic import BaseModel, ConfigDict


class CardBase(BaseModel):
    tagid: str
    lastname: str
    firstname: str
    middlename: str
    birthday: datetime
    gender: Gender
    snils: str


class CardCreate(CardBase):
    pass


class CardRead(CardBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


class CardReadList(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime
    tagid: str
    lastname: str
    firstname: str
    middlename: str
    birthday: datetime
    gender: Gender
    snils: str
    model_config = ConfigDict(from_attributes=True)


class CardUpdate(BaseModel):
    tagid: Optional[str]
    lastname: Optional[str]
    firstname: Optional[str]
    middlename: Optional[str]
    birthday: Optional[datetime]
    gender: Optional[Gender]
    snils: Optional[str]


class CardHistoryBase(BaseModel):
    card_id: int
    user_id: int
    promotion_id: Optional[int]
    date: datetime
    action: TypeAction
    type_action: str
    lat: str
    lon: str


class CardHistoryCreate(CardHistoryBase):
    pass


class CardHistoryRead(CardBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class CardHistoryReadList(BaseModel):
    id: int
    card_id: int
    user_id: int
    promotion_id: Optional[int]
    date: datetime
    action: str
    type_action: TypeAction
    lat: str
    lon: str
    model_config = ConfigDict(from_attributes=True)


class CardHistoryUpdate(BaseModel):
    card_id: Optional[int]
    user_id: Optional[int]
    promotion_id: Optional[int]
    date: Optional[datetime]
    action: Optional[str]
    type_action: Optional[TypeAction]
    lat: Optional[str]
    lon: Optional[str]
