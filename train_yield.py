import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset
df = pd.read_csv("datasets/yield.csv")

print("Dataset loaded:", df.shape)

# Remove missing values
df = df.dropna()

# Convert Year: 2019-20 -> 2019
df["Year"] = df["Year"].str.split("-").str[0].astype(int)

# Keep only useful columns
df = df[
    [
        "State",
        "District",
        "Crop",
        "Year",
        "Season",
        "Area",
        "Yield"
    ]
]

# Features
X = df.drop("Yield", axis=1)

# Target
y = df["Yield"]

# Convert categorical columns
X = pd.get_dummies(X)

print("Number of features:", X.shape[1])

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("Training started...")

# Smaller Random Forest for faster training
model = RandomForestRegressor(
    n_estimators=20,
    random_state=42,
    n_jobs=-1
)

# Train
model.fit(X_train, y_train)

print("Training completed!")

# R2 Score
score = model.score(X_test, y_test)

print("R2 Score:", score)

# Save model
joblib.dump(model, "models/yield_model.pkl")
joblib.dump(X.columns.tolist(), "models/yield_features.pkl")

print("India Yield model saved successfully!")