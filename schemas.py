from pydantic import BaseModel, Field

# Job Schemas
class JobBase(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=2, max_length=50)
    status: str  # NEEDS VALIDATION!

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    class Config:
        orm_mode = True

# User Schemas
class UserBase(BaseModel):
    username : str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
