# 🌾 Smart Farmer Assistant for Real-Time Farming Insights

**An AI-powered web application that helps farmers make informed agricultural decisions through machine learning-based crop recommendations, fertilizer recommendations, crop yield prediction, and real-time weather information.**

---

## 1. Project Overview

The **Smart Farmer Assistant for Real-Time Farming Insights** is a web-based agricultural decision-support system developed to assist farmers in making better farming decisions using Artificial Intelligence and Machine Learning.

The application analyzes agricultural parameters such as soil nutrients, temperature, humidity, rainfall, soil characteristics and crop information to generate useful farming recommendations.

It provides an interactive interface where users can register, log in, access farming tools, view predictions and track their previous prediction activities.

The system combines a React frontend, FastAPI backend, PostgreSQL database and machine learning models trained using agricultural datasets.

## 2. Objectives

- Provide suitable crop recommendations based on soil and environmental parameters.
- Recommend fertilizers based on soil and crop characteristics.
- Predict crop yield using agricultural and environmental information.
- Provide current weather information for a selected city.
- Maintain individual user accounts and authentication.
- Store prediction results and allow users to view their prediction history.
- Provide an accessible and user-friendly agricultural decision-support platform.

## 3. Features

### 3.1 User Authentication
- User registration and login.
- Password hashing for secure password storage.
- JWT-based authentication.
- Protected application pages.

### 3.2 Crop Recommendation
- Accepts nitrogen (N), phosphorus (P), potassium (K), temperature, humidity, pH and rainfall values.
- Uses a trained Random Forest classification model.
- Recommends a suitable crop based on the input parameters.
- Saves prediction results for the authenticated user.

### 3.3 Fertilizer Recommendation
- Accepts agricultural parameters, including temperature, humidity, moisture, soil type, crop type and nutrient values.
- Uses a trained Random Forest classification model.
- Recommends a fertilizer category based on the input.
- Saves fertilizer prediction results.

### 3.4 Crop Yield Prediction
- Predicts crop yield using agricultural and environmental parameters.
- Uses a trained Random Forest regression model.
- Provides an estimated yield result.

### 3.5 Weather Information
- Retrieves current weather information for a selected city.
- Uses an external weather API.
- Displays weather information through the application's frontend.

### 3.6 Dashboard
- Displays user-related prediction information.
- Provides a summary of prediction activities.
- Shows recent prediction information.

### 3.7 Prediction History
- Stores crop and fertilizer prediction results in PostgreSQL.
- Associates saved predictions with the authenticated user.
- Allows users to retrieve their previous prediction records.

## 4. Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Frontend Routing | React Router DOM |
| API Communication | Axios |
| Backend | Python, FastAPI |
| API Documentation | Swagger UI |
| Machine Learning | Scikit-learn |
| ML Algorithms | Random Forest Classifier and Regressor |
| Data Processing | Pandas, NumPy |
| Model Serialization | Joblib |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT, Passlib, bcrypt |
| Weather Integration | External Weather API |
| Development Tools | VS Code, Git, GitHub, Postman, pgAdmin |

## 5. System Architecture

The application follows a frontend-backend architecture.

```text
             USER
               |
               v
       REACT FRONTEND
       (HTML, CSS, JS)
               |
               v
        AXIOS API REQUESTS
               |
               v
         FASTAPI BACKEND
               |
       +-------+--------+
       |       |        |
       v       v        v
    MACHINE  POSTGRES  WEATHER
    LEARNING DATABASE  API
    MODELS
       |       |
       +-------+
               |
               v
       PREDICTION RESULTS
               |
               v
        REACT FRONTEND
               |
               v
             USER
```

### Application Workflow

1. The user registers or logs into the application.
2. The user selects a farming feature.
3. The frontend collects the required input parameters.
4. Axios sends the request to the FastAPI backend.
5. The backend processes the request using the relevant machine learning model or external service.
6. The generated prediction is returned to the frontend.
7. Supported prediction results are stored in PostgreSQL.
8. The user can view the results and access their prediction history.

## 6. Machine Learning Models

The project uses supervised machine learning techniques for agricultural predictions.

| Prediction | Algorithm | Model Type |
|---|---|---|
| Crop Recommendation | Random Forest | Classification |
| Fertilizer Recommendation | Random Forest | Classification |
| Crop Yield Prediction | Random Forest | Regression |

### 6.1 Crop Recommendation Model

- Dataset: `datasets/crop.csv`
- Input features: N, P, K, temperature, humidity, pH and rainfall.
- Target: Crop label.
- Training script: `train_crop.py`
- Saved model: `models/crop_model.pkl`

### 6.2 Fertilizer Recommendation Model

- Dataset: `datasets/fertilizer.csv`
- Input features include temperature, humidity, moisture, soil type, crop type and nutrient values.
- Target: Fertilizer name.
- Training script: `train_fertilizer.py`
- Saved model: `models/fertilizer_model.pkl`

### 6.3 Crop Yield Prediction Model

- Dataset: `datasets/yield.csv`
- Input features include area, crop item, year, rainfall, pesticide usage and average temperature.
- Target: Crop yield.
- Training script: `train_yield.py`
- Saved model: `models/yield_model.pkl`
- Supporting feature file: `models/yield_features.pkl`

The trained models are serialized using Joblib and loaded by the backend during prediction.

## 7. Dataset Description

The project uses three agricultural datasets:

| Dataset | Purpose |
|---|---|
| `crop.csv` | Crop recommendation |
| `fertilizer.csv` | Fertilizer recommendation |
| `yield.csv` | Crop yield prediction |

These datasets provide the agricultural input features and target values required to train the machine learning models.

## 8. Database Design

The application uses **PostgreSQL** as its relational database and SQLAlchemy as its ORM.

The primary database entities include:

### Users
Stores user account information.

- User ID
- Name
- Email
- Hashed password

### Predictions
Stores prediction information associated with users.

- Prediction ID
- User ID
- Prediction type
- Prediction result
- Created timestamp

The relationship between users and predictions allows prediction records to be associated with individual accounts.

Database schema file: `database/schema.sql`

## 9. API Endpoints

The backend is developed using FastAPI.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API home/status |
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate a user |
| POST | `/predict-crop` | Generate crop recommendation |
| POST | `/predict-fertilizer` | Generate fertilizer recommendation |
| POST | `/predict-yield` | Predict crop yield |
| GET | `/predictions/{user_id}` | Retrieve prediction history |
| GET | `/dashboard/{user_id}` | Retrieve dashboard information |
| GET | `/weather/{city}` | Retrieve current weather information |

### API Documentation

FastAPI provides interactive API documentation through Swagger UI.

After starting the backend, access:

`http://127.0.0.1:8000/docs`

## 10. Project Folder Structure

```text
SmartFarmerAssistant/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   ├── jwt_handler.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   │
│   └── routes/
│       ├── auth.py
│       ├── crop.py
│       ├── fertilizer.py
│       └── weather.py
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
│   ├── yield_model.pkl
│   └── yield_features.pkl
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── development_scripts/
│
├── old_streamlit_backup/
│
├── train_crop.py
├── train_fertilizer.py
├── train_yield.py
├── requirements-project.txt
├── .env
├── .gitignore
└── README.md
```

## 11. Installation and Setup

### Prerequisites

Install the following software:

- Python
- Node.js and npm
- PostgreSQL
- pgAdmin
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone https://github.com/keerthipandala/SmartFarmerAssistant.git
```

Navigate to the project directory:

```bash
cd SmartFarmerAssistant
```

### Step 2: Install Backend Dependencies

```bash
python -m pip install -r requirements-project.txt
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root directory.

Add the following variables with your own local configuration:

```env
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smart_farmer

WEATHER_API_KEY=your_weather_api_key

JWT_SECRET_KEY=your_secure_secret_key
```

Do not upload the actual `.env` file or expose API keys, database passwords or JWT secrets on GitHub.

### Step 4: Configure PostgreSQL

1. Open pgAdmin.
2. Create a PostgreSQL database named `smart_farmer`.
3. Configure the database credentials in `.env`.
4. Execute `database/schema.sql` if required by your database setup.

### Step 5: Start the Backend

From the project root directory, run:

```bash
python -m uvicorn backend.main:app --reload
```

Backend URL:

`http://127.0.0.1:8000`

Swagger documentation:

`http://127.0.0.1:8000/docs`

### Step 6: Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### Step 7: Start the Frontend

```bash
npm start
```

Frontend URL:

`http://localhost:3000`

The application can now be accessed through the browser.

## 12. Model Training

To retrain the machine learning models, execute the corresponding scripts from the project root:

**Crop model**

```bash
python train_crop.py
```

**Fertilizer model**

```bash
python train_fertilizer.py
```

**Yield model**

```bash
python train_yield.py
```

The scripts train the respective models using the datasets and save the generated model files in the `models/` directory.

## 13. Testing and Validation

The project can be tested using:

- Swagger UI for backend API testing.
- Postman for sending and validating API requests.
- Browser testing for frontend functionality.
- PostgreSQL/pgAdmin for checking stored user and prediction records.
- Python scripts for checking datasets and model features.

## 14. Future Enhancements

The following features can be considered for future development:

- Plant disease detection using image classification and deep learning.
- Multilingual support for regional languages.
- Weather forecasting and weather-based agricultural alerts.
- Mobile application for easier farmer access.
- Additional crop and fertilizer datasets.
- More advanced agricultural recommendation techniques.
- Integration with IoT-based soil and environmental sensors.

**Note:** Plant disease detection is a proposed future enhancement and is not currently implemented in this version.

## 15. Limitations and Disclaimer

- Prediction quality depends on the quality, coverage and relevance of the training datasets.
- Model predictions are estimates and may not represent actual field conditions.
- Weather information depends on the availability and accuracy of the external weather service.
- Fertilizer recommendations should be interpreted as predicted fertilizer categories, not automatically as application dosages.

This project is developed for educational and agricultural decision-support purposes. Farmers should consult qualified agricultural experts before making important farming decisions.

## 16. Developer Information

**Developed by:** Keerthi Pandala

**Course:** B.Tech – Artificial Intelligence and Machine Learning

**Institution:** Anurag University

**Project Title:** Smart Farmer Assistant for Real-Time Farming Insights

**GitHub Repository:**
https://github.com/keerthipandala/SmartFarmerAssistant

---

*Smart Farmer Assistant – Using Artificial Intelligence and Machine Learning to support smarter agricultural decisions.*