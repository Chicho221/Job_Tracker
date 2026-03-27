from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, init_db
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
    title: str
    company: str
    status: str

@app.get("/")
def home():
    return {'message': 'Job Tracker API is running..'}

@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    return jobs

@app.post("/jobs")
def post_jobs(job: JobRequest, db: Session = Depends(get_db)): 
    job_id = len(jobs) + 1
    db_job = Job(title=job.title, company=job.company, status=job.status)

    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    # jobs.append({
    #     "id": job_id,
    #     "job": job.model_dump(),
    # })
    return {
        "id": db_job.id,
        "title": db_job.title,
        "company": db_job.company,
        "status": db_job.status,
    }

