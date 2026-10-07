from pydantic import BaseModel


class CropRequest(BaseModel):
    user_id: int
    N: int
    P: int
    K: int
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class FertilizerRequest(BaseModel):
    user_id: int
    temperature: int
    humidity: int
    moisture: int
    soil_type: str
    crop_type: str
    nitrogen: int
    potassium: int
    phosphorous: int

class YieldRequest(BaseModel):
    user_id: int

    State: str
    District: str
    Crop: str
    Year: int
    Season: str
    Area: float 

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str