from core.database import Base
from sqlalchemy import DateTime, Column, ForeignKey, Integer, String

class Path(Base):
    __tablename__ = "path"

    id = Column(Integer, primary_key=True, index=True)

    work_id = Column(Integer, ForeignKey('work.id'))
    gov_number = Column(String)
    path_number = Column(String)
    user_id = Column(Integer, ForeignKey('user.id'))
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))

