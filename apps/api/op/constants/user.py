from enum import Enum


class UserRole(str, Enum):
    OPERATOR = "operator"
    PARTNER = "partner"
