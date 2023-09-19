from core.database import Base
from sqlalchemy import  Column, Integer, String

class Target(Base):
    __tablename__ = "target"

    id = Column(Integer, primary_key=True, index=True)

    city = Column(String)
    min_age = Column(Integer)
    max_age = Column(Integer)
    gender  = Column(String)



