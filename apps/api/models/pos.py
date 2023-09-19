from core.database import Base
from sqlalchemy import  Column, ForeignKey, Integer, String, Float

class POS(Base):
    __tablename__ = "pos"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey('user.id'))

    name = Column(String)
    address = Column(String)
    lat = Column(Float)
    lon  = Column(Float)

