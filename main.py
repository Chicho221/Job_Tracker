from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
jobs = []

class JobRequest(BaseModel):
    title: str
    company: str
    status: str

@app.get("/")
def home():
    return {'message': 'Job Tracker API is running..'}

@app.get("/jobs")
def get_jobs():
    return jobs

@app.post("/jobs")
def post_jobs(job: JobRequest):
    job_id = len(jobs) + 1
    jobs.append({
        "id": job_id,
        "job": job.model_dump(),
    })
    return