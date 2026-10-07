import pandas as pd

# ----------------------------
# 1. CROP DATASET
# ----------------------------
print("\n🌾 CROP DATASET")
crop_df = pd.read_csv("datasets/crop.csv")

crop_df = crop_df.loc[:, ~crop_df.columns.str.contains('^Unnamed')]

print("Shape:", crop_df.shape)
print("Columns:", crop_df.columns)
print(crop_df.head())


# ----------------------------
# 2. FERTILIZER DATASET
# ----------------------------
print("\n🌿 FERTILIZER DATASET")
fert_df = pd.read_csv("datasets/fertilizer.csv")

fert_df = fert_df.loc[:, ~fert_df.columns.str.contains('^Unnamed')]

print("Shape:", fert_df.shape)
print("Columns:", fert_df.columns)
print(fert_df.head())


# ----------------------------
# 3. YIELD DATASET
# ----------------------------
print("\n📈 YIELD DATASET")
yield_df = pd.read_csv("datasets/yield.csv")

yield_df = yield_df.loc[:, ~yield_df.columns.str.contains('^Unnamed')]

print("Shape:", yield_df.shape)
print("Columns:", yield_df.columns)
print(yield_df.head())