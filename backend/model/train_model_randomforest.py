
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from joblib import dump
from utils.preprocess import preprocess_data
import matplotlib.pyplot as plt
import os
import json

# Load original training data
# df = pd.read_csv('data/agri_dataset_completed.csv')

df = pd.read_csv('data/agri_dataset_completed.csv')

df = preprocess_data(df)

# Try loading user feedback if available
feedback_path = 'data/feedback_log.csv'
print("Paths Exist :", os.path.exists(feedback_path))
if os.path.exists(feedback_path):
    feedback_df = pd.read_csv(feedback_path)
    feedback_df = preprocess_data(feedback_df)

    # Assign weights (optional)
    feedback_df['weight'] = feedback_df['feedback'].apply(lambda x: 2 if x == 'satisfied' else 1)
    feedback_df.drop(columns=['feedback'], inplace=True)
    df['weight'] = 1
    df = pd.concat([df, feedback_df], ignore_index=True)
else:
    df['weight'] = 1

# Split features and labels
X = df.drop(['market_price', 'weight'], axis=1)
y = df['market_price']
sample_weights = df['weight']

# Train-test split
X_train, X_test, y_train, y_test, w_train, w_test = train_test_split(
    X, y, sample_weights, test_size=0.1, random_state=42
)

# 👉 Replace XGBoost with Random Forest
model = RandomForestRegressor(n_estimators=200, max_depth=15, random_state=42)
model.fit(X_train, y_train, sample_weight=w_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("MSE:", mse)
print("R² Score:", r2)

# Save model
dump(model, 'model/model_randomforest.pkl')
print("Model saved to model/model_randomforest.pkl")

# Save metrics to JSON
metrics = {
    'mse': round(mse, 4),
    'r2': round(r2, 4)
}

with open('model/metrics_randomforest.json', 'w') as f:
    json.dump(metrics, f, indent=4)

print("Metrics saved to model/metrics_randomforest.json")


from sklearn.dummy import DummyRegressor

dummy = DummyRegressor(strategy='mean')
dummy.fit(X_train, y_train)
y_dummy_pred = dummy.predict(X_test)
print("Dummy R²:", r2_score(y_test, y_dummy_pred))


# Plot actual vs predicted
plt.scatter(y_test, y_pred, alpha=0.5)
plt.xlabel("Actual Price")
plt.ylabel("Predicted Price")
plt.title("Actual vs Predicted (Random Forest)")
plt.grid(True)
plt.show()


