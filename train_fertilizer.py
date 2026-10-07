import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("datasets/fertilizer.csv")

# Clean column names (important)
df.columns = df.columns.str.strip()

# Features & target
X = df.drop("Fertilizer Name", axis=1)
y = df["Fertilizer Name"]

# Convert categorical columns
X = pd.get_dummies(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# Model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train
model.fit(X_train, y_train)

# Accuracy
print("Accuracy:", model.score(X_test, y_test))

# Save model
joblib.dump(model, "models/fertilizer_model.pkl")

print("Fertilizer model saved successfully!")

