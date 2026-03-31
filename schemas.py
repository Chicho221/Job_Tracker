from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime
from typing import List

## Job Schemas

class JobStatus(str, Enum):
    applied = "applied"
    interview = "interview"
    rejected = "rejected"

class JobBase(BaseModel):   
    title: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=2, max_length=50)
    status: JobStatus

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_encoders= {
            datetime: lambda v: v.strftime("%Y-%m-%d %H:%M")
        }

class PaginatedJobs(BaseModel):
    total: int
    jobs: List[Job]

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
