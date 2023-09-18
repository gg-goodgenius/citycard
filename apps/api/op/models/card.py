from core.database import Base
from sqlalchemy import Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.sql import func


class Card(Base):
    __tablename__ = "card"

    id = Column(Integer, primary_key=True, index=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    tagid = Column(String)
    lastname = Column(String)
    firstname = Column(String)
    middlename = Column(String)

    birthday = Column(Date)

    gender = Column(String)
    snils = Column(String)


class CardHistory(Base):
    __tablename__ = "card_history"

    id = Column(Integer, primary_key=True, index=True)

    card_id = Column(Integer, ForeignKey("card.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    promotion_id = Column(Integer, ForeignKey("promotion.id"), nullable=True)
    date = Column(DateTime(timezone=True), server_default=func.now())
    action = Column(String)
    type_action = Column(String)
    lat = Column(Float)
    lon = Column(Float)
