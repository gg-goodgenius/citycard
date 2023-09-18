from datetime import datetime
from typing import Optional

from constants.promotion import PromotionConditionEq, PromotionConditionField
from pydantic import BaseModel, ConfigDict


class PromotionBase(BaseModel):
    start_date: datetime
    end_date: datetime

    name: str
    value: str

    user_id: int


class PromotionCreate(PromotionBase):
    pass


class PromotionRead(PromotionBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class PromotionReadList(BaseModel):
    id: int
    start_date: datetime
    end_date: datetime
    name: str
    value: str
    user_id: int
    model_config = ConfigDict(from_attributes=True)


class PromotionUpdate(BaseModel):
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    name: Optional[str]
    value: Optional[str]
    user_id: Optional[int]


class PromotionCondition(BaseModel):
    promotion_id: int
    field: PromotionConditionField
    condition: PromotionConditionEq
    value: str


class PromotionConditionCreate(PromotionCondition):
    pass


class PromotionConditionRead(PromotionCondition):
    id: int
    model_config = ConfigDict(from_attributes=True)


class PromotionConditionReadList(BaseModel):
    id: int
    promotion_id: int
    field: PromotionConditionField
    condition: PromotionConditionEq
    value: str
    model_config = ConfigDict(from_attributes=True)


class PromotionConditionUpdate(BaseModel):
    promotion_id: Optional[int]
    field: Optional[PromotionConditionField]
    condition: Optional[PromotionConditionEq]
    value: Optional[str]
