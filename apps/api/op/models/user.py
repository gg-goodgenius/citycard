from core.database import Base
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String)
    email = Column(String)
    role = Column(String)
    hashed_password = Column(String)

