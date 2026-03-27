from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, model_validator
from database import SessionLocal, init_db
from typing import List
from models import Job


app = FastAPI()

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
    title: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=2, max_length=50)
    status: str  # NEEDS VALIDATION!

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

# Edits entry
@app.put("/jobs/{id}", response_model=JobRequest)
def edit_job(id: int, job: JobRequest, db: Session = Depends(get_db)):
    db_job = db.query(Job).filter(Job.id == id).first()

    if not db_job:
        raise HTTPException(status_code = 404, detail = "Job not found.")
    
    db_job.title = job.title
    db_job.company = job.company
    db_job.status = job.status

    db.commit()
    db.refresh(db_job)
    return db_job

# Deletes entry
@app.delete("/jobs/{id}", status_code=204)
def delete_job(id: int, job: JobRequest, db: Session = Depends(get_db)):
    db_job = db.query(Job).filter(Job.id == id).first()

    if not db_job:
        raise HTTPException(status_code = 404, detail = "Job not found.")
    
    db.delete(db_job)
    db.commit()
    return None
