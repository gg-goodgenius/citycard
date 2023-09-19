from datetime import datetime
from typing import Optional

from constants import Gender, TypeAction
from pydantic import BaseModel, ConfigDict, computed_field

from .user import UserReadShort


class CardBase(BaseModel):
    tagid: str
    lastname: str
    firstname: str
    middlename: str
    birthday: datetime
    gender: Gender
    snils: str
    is_active: bool


class CardCreate(CardBase):
    pass


class CardRead(CardBase):
    id: int
    created_at: datetime
    updated_at: datetime

    @computed_field
    def age(self) -> int:
        today = datetime.today()
        birthday = self.birthday
        age = today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))
        return age

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
    is_active: bool

    @computed_field
    def age(self) -> int:
        today = datetime.today()
        birthday = self.birthday
        age = today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))
        return age

    model_config = ConfigDict(from_attributes=True)


class CardUpdate(BaseModel):
    tagid: Optional[str] = None
    lastname: Optional[str] = None
    firstname: Optional[str] = None
    middlename: Optional[str] = None
    birthday: Optional[datetime] = None
    gender: Optional[Gender] = None
    snils: Optional[str] = None
    is_active: Optional[bool] = None


class CardHistoryBase(BaseModel):
    card_id: int
    user_id: int
    promotion_id: Optional[int]
    date: datetime
    action: str
    type_action: TypeAction
    lat: float
    lon: float


class CardHistoryCreate(CardHistoryBase):
    pass


class CardHistoryRead(CardHistoryBase):
    id: int
    user: UserReadShort
    card: CardRead
    model_config = ConfigDict(from_attributes=True)


class CardHistoryReadList(BaseModel):
    id: int
    card_id: int
    user_id: int
    promotion_id: Optional[int] = None
    date: datetime
    action: str
    type_action: TypeAction
    lat: float
    lon: float
    model_config = ConfigDict(from_attributes=True)


class CardHistoryUpdate(BaseModel):
    card_id: Optional[int] = None
    user_id: Optional[int] = None
    promotion_id: Optional[int] = None
    date: Optional[datetime] = None
    action: Optional[str] = None
    type_action: Optional[TypeAction] = None
    lat: Optional[str] = None
    lon: Optional[str] = None
