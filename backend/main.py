from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import joblib
yield_model = joblib.load("models/yield_model.pkl")
yield_features = joblib.load("models/yield_features.pkl")
from sqlalchemy.orm import Session
from backend.schemas import ( CropRequest, UserCreate, LoginRequest, YieldRequest)
from backend.routes.crop import predict_crop
from backend.routes.auth import create_user, login_user
from backend.database import get_db
from backend.models import Prediction
from backend.schemas import FertilizerRequest
from backend.routes.fertilizer import predict_fertilizer
from backend.routes.weather import get_weather
import pandas as pd

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Smart Farmer API Running"
    }


@app.post("/register")
def register(
    data: UserCreate,
    db: Session = Depends(get_db)
):

    user = create_user(data, db)

    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }

@app.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    result = login_user(
        data,
        db
    )

    if result is None:
        return {
            "message": "Invalid email or password"
        }

    user = result["user"]
    token = result["token"]

    return {
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "access_token": token
    }

@app.post("/predict-crop")
def crop_prediction(
    data: CropRequest,
    db: Session = Depends(get_db)
):

    result = predict_crop(data)

    new_prediction = Prediction(
        user_id=data.user_id,
        prediction_type="crop",
        result=str(result)
    )

    db.add(new_prediction)
    db.commit()

    return {
        "recommended_crop": result,
        "message": "Prediction saved successfully"
    }

@app.post("/predict-fertilizer")
def fertilizer_prediction(
    data: FertilizerRequest,
    db: Session = Depends(get_db)
):

    result = predict_fertilizer(data)

    new_prediction = Prediction(
        user_id=data.user_id,
        prediction_type="fertilizer",
        result=str(result)
    )

    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "recommended_fertilizer": result,
        "message": "Fertilizer prediction saved successfully"
    }


@app.get("/predictions/{user_id}")
def get_predictions(
    user_id: int,
    db: Session = Depends(get_db)
):

    predictions = db.query(Prediction).filter(
        Prediction.user_id == user_id
    ).all()

    return predictions

@app.get("/dashboard/{user_id}")
def dashboard(
    user_id: int,
    db: Session = Depends(get_db)
):

    predictions = db.query(Prediction).filter(
        Prediction.user_id == user_id
    ).all()

    return {
        "user_id": user_id,
        "total_predictions": len(predictions),
        "predictions": predictions
    }

@app.get("/weather/{city}")
def weather(city: str):

    return get_weather(city)

@app.post("/predict-yield")
def predict_yield(
    data: YieldRequest,
    db: Session = Depends(get_db)
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

    new_prediction = Prediction(
        user_id=data.user_id,
        prediction_type="yield",
        result=str(round(prediction, 2))
    )

    db.add(new_prediction)
    db.commit()

    return {
        "predicted_yield": round(prediction, 2),
        "unit": "tonnes/hectare",
        "message": "Yield prediction saved successfully"
    }