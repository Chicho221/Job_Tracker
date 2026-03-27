from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, model_validator
from database import SessionLocal, init_db
from typing import List
from models import JobModel
from schemas import JobCreate, Job


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

@app.get("/")
def home():
    return {'message': 'Job Tracker API is running..'}

# Pulls all enties from database
@app.get("/jobs", response_model=List[Job])
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(JobModel).all()
    return jobs

# Pushes entry into the database
@app.post("/jobs")
def post_jobs(job: JobCreate, db: Session = Depends(get_db)): 

    db_job = JobModel(title=job.title, company=job.company, status=job.status)

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
@app.put("/jobs/{id}", response_model=Job)
def edit_job(id: int, job: JobCreate, db: Session = Depends(get_db)):
    db_job = db.query(JobModel).filter(JobModel.id == id).first()

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
def delete_job(id: int, job: JobCreate, db: Session = Depends(get_db)):
    db_job = db.query(JobModel).filter(JobModel.id == id).first()

    if not db_job:
        raise HTTPException(status_code = 404, detail = "Job not found.")
    
    db.delete(db_job)
    db.commit()
    return None
