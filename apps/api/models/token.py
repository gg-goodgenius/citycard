from core.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String


class Token(Base):
    __tablename__ = "token"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    value = Column(String)
