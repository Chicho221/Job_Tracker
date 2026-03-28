from pydantic import BaseModel, Field
from enum import Enum

# Job Schemas
class JobBase(BaseModel):   
    title: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=2, max_length=50)
    status: str

class JobStatus(str, Enum):
    applied = "applied"
    interview = "interview"
    rejected = "rejected"

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# User Schemas
class UserBase(BaseModel):
    username : str

class UserCreate(UserBase):
    password: str
    pass
    
class User(UserBase):
    id: int

    class Config:
        from_attributes = True
