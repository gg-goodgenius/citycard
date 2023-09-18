from core.database import Base
from sqlalchemy import Column, ForeignKey, Integer, DateTime

class Work(Base):
    __tablename__ = "work"

    id = Column(Integer, primary_key=True, index=True)

    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    
    user_id = Column(Integer, ForeignKey('user.id'))



