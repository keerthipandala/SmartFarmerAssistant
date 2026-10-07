import streamlit as st
import pandas as pd
import joblib

# Load model
model = joblib.load("models/yield_model.pkl")

st.title("📈 Crop Yield Prediction System")

st.markdown("Predict crop yield based on environmental and farming conditions")

# ---------------------------
# INPUT SECTION
# ---------------------------

area = st.text_input("🌍 Area (Country)", "Albania")
item = st.text_input("🌾 Crop (Item)", "Maize")

year = st.number_input("📅 Year", 1990, 2030, 2024)

rainfall = st.number_input("🌧 Average Rainfall (mm/year)", 0.0, 5000.0, 1000.0)

pesticides = st.number_input("🧪 Pesticides (tonnes)", 0.0, 10000.0, 100.0)

temp = st.number_input("🌡 Average Temperature (°C)", 0.0, 60.0, 25.0)

# ---------------------------
# PREDICTION BUTTON
# ---------------------------

if st.button("📊 Predict Yield"):

    input_df = pd.DataFrame([[
        area,
        item,
        year,
        rainfall,
        pesticides,
        temp
    ]], columns=[
        "Area",
        "Item",
        "Year",
        "average_rain_fall_mm_per_year",
        "pesticides_tonnes",
        "avg_temp"
    ])

    # Convert categorical columns
    input_df = pd.get_dummies(input_df)

    # Align with training model features
    input_df = input_df.reindex(
        columns=model.feature_names_in_,
        fill_value=0
    )

    # Prediction
    prediction = model.predict(input_df)

    st.success(f"📈 Predicted Yield: {prediction[0]:.2f} hg/ha")

    st.info("💡 This prediction is based on historical crop yield data and environmental conditions.")