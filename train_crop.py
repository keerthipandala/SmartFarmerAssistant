import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("datasets/crop.csv")

# Remove extra columns safely
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

# Features & target
X = df.drop("label", axis=1)
y = df["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# Model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train model
model.fit(X_train, y_train)

# Accuracy
accuracy = model.score(X_test, y_test)
print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "models/crop_model.pkl")

print("Model saved successfully!")