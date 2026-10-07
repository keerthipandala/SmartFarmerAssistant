import streamlit as st
import numpy as np
import joblib

model = joblib.load("models/crop_model.pkl")

st.title("🌾 Crop Prediction")

N = st.number_input("Nitrogen", 0, 140, 50)
P = st.number_input("Phosphorus", 0, 140, 50)
K = st.number_input("Potassium", 0, 200, 50)
temp = st.number_input("Temperature", 0.0, 50.0, 25.0)
humidity = st.number_input("Humidity", 0.0, 100.0, 50.0)
ph = st.number_input("pH", 0.0, 14.0, 7.0)
rainfall = st.number_input("Rainfall", 0.0, 300.0, 100.0)

if st.button("Predict Crop"):
    input_data = np.array([[N, P, K, temp, humidity, ph, rainfall]])
    prediction = model.predict(input_data)
    st.success(f"🌱 Best Crop: {prediction[0]}")