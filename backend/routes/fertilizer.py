import joblib
import pandas as pd

# Load model
fertilizer_model = joblib.load("models/fertilizer_model.pkl")


def predict_fertilizer(data):

    input_data = {
        "Temparature": data.temperature,
        "Humidity": data.humidity,
        "Moisture": data.moisture,
        "Nitrogen": data.nitrogen,
        "Potassium": data.potassium,
        "Phosphorous": data.phosphorous,

        "Soil Type_Black": 0,
        "Soil Type_Clayey": 0,
        "Soil Type_Loamy": 0,
        "Soil Type_Red": 0,
        "Soil Type_Sandy": 0,

        "Crop Type_Barley": 0,
        "Crop Type_Cotton": 0,
        "Crop Type_Ground Nuts": 0,
        "Crop Type_Maize": 0,
        "Crop Type_Millets": 0,
        "Crop Type_Oil seeds": 0,
        "Crop Type_Paddy": 0,
        "Crop Type_Pulses": 0,
        "Crop Type_Sugarcane": 0,
        "Crop Type_Tobacco": 0,
        "Crop Type_Wheat": 0
    }

    soil_column = f"Soil Type_{data.soil_type}"
    crop_column = f"Crop Type_{data.crop_type}"

    if soil_column in input_data:
        input_data[soil_column] = 1

    if crop_column in input_data:
        input_data[crop_column] = 1

    df = pd.DataFrame([input_data])

    prediction = fertilizer_model.predict(df)

    return prediction[0]