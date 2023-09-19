from core.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Promotion(Base):
    __tablename__ = "promotion"

    id = Column(Integer, primary_key=True, index=True)

    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))

    name = Column(String)
    value = Column(Integer)

    user_id = Column(Integer, ForeignKey("user.id"))
    target_id = Column(Integer, ForeignKey("target.id"), nullable=True)

    condition = relationship("PromotionCondition", back_populates="promotion")


class PromotionCondition(Base):
    __tablename__ = "promotion_condidtion"
    id = Column(Integer, primary_key=True, index=True)

    promotion_id = Column(Integer, ForeignKey("promotion.id"))

    field = Column(String)
    condition = Column(String)
    value = Column(String)

    promotion = relationship("Promotion", back_populates="condition")
