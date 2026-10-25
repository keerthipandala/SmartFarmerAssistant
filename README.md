# 🌾 Smart Farmer Assistant

**An AI/ML-based application that helps farmers make informed farming decisions.**

## 📌 Project Overview

Smart Farmer Assistant is a web-based agricultural support application designed to provide farmers with useful farming insights through machine learning and weather information.

The application includes crop recommendation, fertilizer recommendation, crop yield prediction, weather information, user authentication, and prediction history.

The project aims to make agricultural information more accessible and support farmers in making data-driven decisions.

## 🎯 Objectives

- Recommend suitable crops based on soil and environmental parameters.
- Provide fertilizer recommendations using machine learning.
- Predict crop yield using agricultural data.
- Display weather information for a selected location.
- Allow users to register, log in, and access their prediction history.
- Store prediction records in a database.

## ✨ Features

### 🌱 Crop Recommendation
Recommends a crop based on:
- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Soil pH
- Rainfall

### 🧪 Fertilizer Recommendation
Provides a fertilizer recommendation based on the input agricultural parameters supported by the trained model.

### 📊 Crop Yield Prediction
Predicts crop yield using agricultural features supported by the trained regression model.

### 🌦️ Weather Information
Provides weather information for a selected city using a weather API.

### 🔐 User Authentication
- User registration
- User login
- JWT-based authentication for protected endpoints

### 📜 Prediction History
Stores prediction records in PostgreSQL and allows users to view their prediction history.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- JWT Authentication

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib
- Random Forest Classification
- Random Forest Regression

### Database
- PostgreSQL

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- pgAdmin
- Swagger UI

## 📂 Project Structure

```text
SmartFarmerAssistant/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   └── models.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── styles/
│
├── database/
│   └── schema.sql
│
├── datasets/
│   ├── crop.csv
│   ├── fertilizer.csv
│   └── yield.csv
│
├── models/
│   ├── crop_model.pkl
│   ├── fertilizer_model.pkl
│   └── yield_model.pkl
│
├── disease_detection/
│
├── train_crop.py
├── train_fertilizer.py
├── train_yield.py
│
├── requirements.txt
├── .env
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/keerthipandala/SmartFarmerAssistant.git
```

### 2. Navigate to the Project

```bash
cd SmartFarmerAssistant
```

### 3. Create a Python Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the project root.

Configure the required database connection, JWT secret, and weather API credentials according to the backend configuration.

**Important:** Do not upload your `.env` file or API keys to GitHub.

### 6. Configure PostgreSQL

- Install PostgreSQL.
- Create the project database.
- Configure the database connection in `.env`.
- Execute the SQL statements from `database/schema.sql` if required by your setup.

### 7. Run the Backend

From the project root:

```bash
python -m uvicorn backend.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 8. Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

Frontend URL:

```text
http://localhost:3000
```

## 🔄 Application Workflow

1. User registers or logs in.
2. User accesses the farming modules.
3. User provides the required agricultural input values.
4. The backend receives the input.
5. The trained machine learning model generates a prediction.
6. The prediction is returned to the frontend.
7. Prediction records are stored in PostgreSQL.
8. The user can view their prediction history.

## 🤖 Machine Learning Models

| Module | Model Type |
|---|---|
| Crop Recommendation | Random Forest Classifier |
| Fertilizer Recommendation | Random Forest Classifier |
| Crop Yield Prediction | Random Forest Regressor |

The models are trained using agricultural datasets and saved for prediction.

## 🗄️ Database

PostgreSQL is used to store user information and prediction records.

The application uses SQLAlchemy for database interaction.

## 🚀 Future Enhancements

- Farmer-friendly input forms
- Soil report upload and value extraction
- Rice cultivation guidance
- Crop disease detection
- Location-based agricultural advisories
- Improved weather-based recommendations
- Multilingual support
- Mobile-friendly interface

## 👩‍💻 Developed By

**Keerthi Pandala**

B.Tech – Artificial Intelligence and Machine Learning

Anurag University

## 📌 Disclaimer

This application provides machine learning-based agricultural predictions for educational and decision-support purposes. Predictions should not replace soil testing, local agricultural advisories, or professional farming guidance.
