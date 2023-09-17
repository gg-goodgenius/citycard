from pydantic import BaseModel


class EnumBase(BaseModel):
    name: str
    description: str | None = None


class EnumCreate(EnumBase):
    pass


class Enum(EnumBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    enum: Enum

    class Config:
        orm_mode = True
