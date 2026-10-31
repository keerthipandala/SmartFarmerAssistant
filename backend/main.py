
from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

import joblib
import pandas as pd

from backend.schemas import (
    CropRequest,
    UserCreate,
    LoginRequest,
    YieldRequest,
    FertilizerRequest,
)
from backend.routes.crop import predict_crop
from backend.routes.auth import create_user, login_user
from backend.routes.fertilizer import predict_fertilizer
from backend.routes.weather import get_weather
from backend.database import get_db
from backend.models import Prediction, User
from backend.jwt_handler import verify_access_token


# Load machine-learning models
yield_model = joblib.load("models/yield_model.pkl")
yield_features = joblib.load("models/yield_features.pkl")


app = FastAPI(title="Smart Farmer Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# JWT authentication
bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please log in.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme.",
        )

    user_id = verify_access_token(credentials.credentials)

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found.",
        )

    return user


def verify_requested_user(user_id: int, current_user: User):
    if user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot access another user's data.",
        )


@app.get("/")
def home():
    return {"message": "Smart Farmer API Running"}


# Registration: public endpoint
@app.post("/register")
def register(
    data: UserCreate,
    db: Session = Depends(get_db),
):
    user = create_user(data, db)

    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
    }


# Login: public endpoint
@app.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    result = login_user(data, db)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    user = result["user"]
    token = result["token"]

    return {
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "access_token": token,
        "token_type": "bearer",
    }


# Crop prediction: authenticated users only
@app.post("/predict-crop")
def crop_prediction(
    data: CropRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Never trust the user ID supplied by the frontend.
    data.user_id = current_user.id

    result = predict_crop(data)

    new_prediction = Prediction(
        user_id=current_user.id,
        prediction_type="crop",
        result=str(result),
    )

    db.add(new_prediction)
    db.commit()

    return {
        "recommended_crop": result,
        "message": "Prediction saved successfully",
    }


# Fertilizer prediction: authenticated users only
@app.post("/predict-fertilizer")
def fertilizer_prediction(
    data: FertilizerRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    data.user_id = current_user.id

    result = predict_fertilizer(data)

    new_prediction = Prediction(
        user_id=current_user.id,
        prediction_type="fertilizer",
        result=str(result),
    )

    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "recommended_fertilizer": result,
        "message": "Fertilizer prediction saved successfully",
    }


# History: users can access only their own records
@app.get("/predictions/{user_id}")
def get_predictions(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    verify_requested_user(user_id, current_user)

    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)
        .order_by(Prediction.id.desc())
        .all()
    )

    return predictions


# Dashboard: users can access only their own records
@app.get("/dashboard/{user_id}")
def dashboard(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    verify_requested_user(user_id, current_user)

    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)
        .order_by(Prediction.id.desc())
        .all()
    )

    return {
        "user_id": current_user.id,
        "total_predictions": len(predictions),
        "predictions": predictions,
    }


# Weather: remains public
@app.get("/weather/{city}")
def weather(city: str):
    return get_weather(city)


# Yield prediction: authenticated users only
@app.post("/predict-yield")
def predict_yield(
    data: YieldRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    input_data = {
        feature: 0
        for feature in yield_features
    }

    input_data["Year"] = data.Year
    input_data["Area"] = data.Area

    state_col = f"State_{data.State}"
    district_col = f"District_{data.District}"
    crop_col = f"Crop_{data.Crop}"
    season_col = f"Season_{data.Season}"

    if state_col in input_data:
        input_data[state_col] = 1

    if district_col in input_data:
        input_data[district_col] = 1

    if crop_col in input_data:
        input_data[crop_col] = 1

    if season_col in input_data:
        input_data[season_col] = 1

    input_df = pd.DataFrame([input_data])

    prediction = yield_model.predict(input_df)[0]
    rounded_prediction = round(float(prediction), 2)

    new_prediction = Prediction(
        user_id=current_user.id,
        prediction_type="yield",
        result=str(rounded_prediction),
    )

    db.add(new_prediction)
    db.commit()

    return {
        "predicted_yield": rounded_prediction,
        "unit": "tonnes/hectare",
        "message": "Yield prediction saved successfully",
    }
