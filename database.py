from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Creates an Engine
engine = create_engine('sqlite:///./jobs.db', echo = True)

# Creates Base class for model classes
Base = declarative_base()

# Creates session class
SessionLocal = sessionmaker(bind=engine)

# Creates all tables defined in models
def init_db():
    Base.metadata.create_all(bind=engine)