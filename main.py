from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import SessionLocal, init_db
from typing import List
from passlib.context import CryptContext
from models import JobModel, UserModel
from schemas import JobCreate, JobStatus, Job, UserCreate, User, PaginatedJobs
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware
SECRET_KEY = "secret_something"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for now)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

## JWT TOKEN CREATION
def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")

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

def get_current_user(token : str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        ## JWT TOKEN VERIFICATION
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")

        if username is None:
            raise HTTPException(status_code=401, detail = "Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail = "Invalid token")
    
    user = db.query(UserModel).filter(UserModel.username == username).first()

    if user is None:
        raise HTTPException(status_code=404, detail = "User not found")
    
    return user


## Job Endpoints

# Search/Get Job
@app.get("/jobs", response_model = PaginatedJobs)
def search_jobs(status: str, search: str | None = None, skip: int = 0, limit: int = 5, sort: str = "newest", current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    limit = min(limit, 50)

    query = db.query(JobModel).filter(JobModel.user_id == current_user.id)
    if status:
        query = query.filter(
            JobModel.status.ilike(f"%{status}%")
        )
    if search:
        query = query.filter(
            or_(
                JobModel.title.ilike(f"%{search}%"),
                JobModel.company.ilike(f"%{search}%"),
                JobModel.status.ilike(f"%{search}%")
            )
        )

    ## Sorting by newest/oldest/company/status
    if sort == "newest":
        query = query.order_by(JobModel.id.desc())    
    elif sort == "oldest":
        query = query.order_by(JobModel.id.asc())
    elif sort == "company":
        query = query.order_by(JobModel.company.desc())
    elif sort == "status":
        query = query.order_by(JobModel.status.asc())

    total = query.count()   
    jobs = query.offset(skip).limit(limit).all()
                                 
    return {"total": total, "jobs": jobs}

# Create Job
@app.post("/jobs")
def post_jobs(job: JobCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_job = JobModel(
        user_id = current_user.id,
        title=job.title,
        company=job.company,
        status=job.status,
    )

    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    return db_job

# Edits Job
@app.put("/jobs/{id}", response_model=Job)
def edit_job(id: int, job: JobCreate, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    db_job = db.query(JobModel).filter(JobModel.id == id).first()

    if not db_job:
        raise HTTPException(status_code = 404, detail = "Job not found.")
    
    if current_user.id != db_job.user_id:
        raise HTTPException(status_code= 403, detail = "Not authorized!")
    
    db_job.title = job.title
    db_job.company = job.company
    db_job.status = job.status

    db.commit()
    db.refresh(db_job)
    return db_job

# Deletes Job
@app.delete("/jobs/{id}", status_code=204)
def delete_job(id: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    db_job = db.query(JobModel).filter(JobModel.id == id).first()
    if not db_job:
        raise HTTPException(status_code = 404, detail = "Job not found.")
    
    if current_user.id != db_job.user_id:
        raise HTTPException(status_code= 403, detail = "Not authorized!")
    
    db.delete(db_job)
    db.commit()
    return None

## User Endpoints

# Create User
@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existingUser = db.query(UserModel).filter(UserModel.username == user.username).first()
    if existingUser:
        raise HTTPException(status_code=400, detail="Username already exists!")
    hashed = pwd_context.hash(user.password)
    db_user = UserModel(username = user.username, password_hash = hashed)
    
        
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {
        "id": db_user.id,
        "username": db_user.username,
    }

# Deletes User
@app.delete("/users/{id}", status_code=204)
def delete_user(id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == id).first()

    if not db_user:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    db.delete(db_user)
    db.commit()
    return None

#Login Endpoint

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == form_data.username).first()

    # Check if username exists in database
    if not db_user:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    # Verify password
    if not pwd_context.verify(form_data.password, db_user.password_hash):
        raise HTTPException(status_code = 401, detail="Wrong Password")
    access_token = create_access_token(data = {"sub": db_user.username})
    return {
        "access_token" : access_token,
        "token_type" : "bearer"
    }

#Job Stats Endpoint
@app.get("/jobs/stats")
def get_stats(current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    jobs = db.query(JobModel).filter(JobModel.user_id == current_user.id).all()

    total = len(jobs)
    applied = len([j for j in jobs if j.status == "applied"])
    interview = len([j for j in jobs if j.status == "interview"])
    rejected = len([j for j in jobs if j.status == "rejected"])

    return {
        "total": total,
        "applied": applied,
        "interview": interview,
        "rejected": rejected
    }