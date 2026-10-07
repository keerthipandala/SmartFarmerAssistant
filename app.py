import streamlit as st

st.set_page_config(page_title="Smart Farmer Assistant", layout="wide")

st.title("🌾 Smart Farmer AI Assistant")

st.sidebar.title("Navigation")
option = st.sidebar.radio(
    "Go to:",
    ["Home", "Crop Prediction", "Fertilizer Prediction", "Yield Prediction"]
)

if option == "Home":
    st.subheader("🌱 Welcome to Smart Farming AI System")
    st.write("""
    This AI system helps farmers:
    - Predict best crop 🌾
    - Recommend fertilizer 🌿
    - Improve yield using data-driven insights 🤖
    """)

elif option == "Crop Prediction":
    st.switch_page("pages/Crop_Prediction.py")

elif option == "Fertilizer Prediction":
    st.switch_page("pages/Fertilizer_Prediction.py")

elif option == "Yield Prediction":
    st.switch_page("pages/Yield_Prediction.py")