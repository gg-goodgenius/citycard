from enum import Enum


class Gender(str, Enum):
    FEMALE = "faemale"
    MALE = "male"
    BOTH = "both"


class TypeAction(str, Enum):
    INFO = "info"
    ALERT = "alert"
    BLOCK = "block"
