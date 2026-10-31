import joblib

model = joblib.load("models/yield_model.pkl")

print("Number of features:", len(model.feature_names_in_))

print("\nFeatures:")
for feature in model.feature_names_in_:
    print(feature)