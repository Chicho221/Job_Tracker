from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey

class JobModel(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    company = Column(String, index=True)
    status = Column(String, index=True)

    def __repr__(self):
        return f"Job(id={self.id}, title={self.title}, company={self.company}, status={self.status})"
    
class UserModel(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password_hash = Column(String)