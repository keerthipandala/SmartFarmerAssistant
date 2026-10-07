from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    prediction_type = Column(String(50))
    result = Column(Text)
    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )