from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, init_db
from typing import List
from models import Job

app = FastAPI()
jobs = []

@app.on_event("startup")
def on_startup():
    init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
class JobRequest(BaseModel):
    id: int
    title: str
    company: str
    status: str

    class Config:
        orm_mode = True
@app.get("/")
def home():
    return {'message': 'Job Tracker API is running..'}

# Pulls all enties from database
@app.get("/jobs", response_model=List[JobRequest])
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    return jobs

# Pushes entry into the database
@app.post("/jobs")
def post_jobs(job: JobRequest, db: Session = Depends(get_db)): 

    db_job = Job(title=job.title, company=job.company, status=job.status)

    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    return {
        "id": db_job.id,
        "title": db_job.title,
        "company": db_job.company,
        "status": db_job.status,
    }

