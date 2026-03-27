from database import Base
from sqlalchemy import Column, Integer, String

class Job(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String, index=True)
    status = Column(String, index=True)

    def __repr__(self):
        return f"Job(id={self.id}, title={self.title}, company={self.company}, status={self.status})"