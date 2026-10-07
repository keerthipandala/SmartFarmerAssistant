import streamlit as st
import pandas as pd
import joblib

model = joblib.load("models/fertilizer_model.pkl")

st.title("🌿 Fertilizer Recommendation")

temp = st.number_input("Temperature", 0, 60, 25)
humidity = st.number_input("Humidity", 0, 100, 50)
moisture = st.number_input("Moisture", 0, 100, 30)

soil = st.selectbox("Soil Type", ["Sandy", "Loamy", "Black", "Red"])
crop = st.selectbox("Crop Type", ["Rice", "Wheat", "Maize", "Cotton"])

N = st.number_input("Nitrogen", 0, 140, 50)
P = st.number_input("Phosphorus", 0, 140, 50)
K = st.number_input("Potassium", 0, 200, 50)

if st.button("Recommend Fertilizer"):

    df = pd.DataFrame([[temp, humidity, moisture, soil, crop, N, K, P]],
                      columns=["Temparature","Humidity","Moisture",
                               "Soil Type","Crop Type",
                               "Nitrogen","Potassium","Phosphorous"])

    df = pd.get_dummies(df)

    df = df.reindex(columns=model.feature_names_in_, fill_value=0)

    pred = model.predict(df)

    st.success(f"🌿 Recommended Fertilizer: {pred[0]}")