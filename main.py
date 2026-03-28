from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, init_db
from typing import List
from passlib.context import CryptContext
from models import JobModel, UserModel
from schemas import JobCreate, Job, UserCreate, User


app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

## Job Endpoints

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

## User Endpoints

# Show Users
@app.get("/users", response_model=List[User])
def get_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users

# Create User
@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed = pwd_context.hash(user.password_hash)
    db_user = UserModel(username = user.username, password_hash = hashed)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {
        "id": db_user.id,
        "username": db_user.username,
        "password": db_user.password_hash ## FOR DEBUG ONLY
    }

# Deletes User
@app.delete("/users/{id}", status_code=204)
def delete_user(id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == id).first()

    if not db_user:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    db.delete(db_user)
    db.commit()
    return None

#Login Endpoint

@app.get("/users/{username}")
def login(username: str,password: str, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()
    # Check if username exists in database
    if not db_user:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    if not pwd_context.verify(password, db_user.password_hash):
        raise HTTPException(status_code = 401, detail="Wrong Password")
    
    return{
        "id" : db_user.id,
        "username" : db_user.username
    }