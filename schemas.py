from pydantic import BaseModel, Field

class JobBase(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=2, max_length=50)
    status: str  # NEEDS VALIDATION!

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    class Config:
        orm_model = True
