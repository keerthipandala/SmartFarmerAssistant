import joblib
import numpy as np

from backend.schemas import CropRequest

# Load trained model
crop_model = joblib.load("models/crop_model.pkl")

def predict_crop(data: CropRequest):

    values = np.array([
        [
            data.N,
            data.P,
            data.K,
            data.temperature,
            data.humidity,
            data.ph,
            data.rainfall
        ]
    ])

    prediction = crop_model.predict(values)

    return prediction[0]