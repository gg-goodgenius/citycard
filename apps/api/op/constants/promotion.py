from enum import Enum


class PromotionConditionField(str, Enum):
    AGE = "age"
    GENDER = "gender"
    POS = "pos"
    TIME = "time"
    CITY = "city"
    TARGET = "target"


class PromotionConditionEq(str, Enum):
    EQ = "eq"
    NE = "ne"
    GE = "ge"
    LE = "le"
    LT = "lt"
    GT = "gt"
