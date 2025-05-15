import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from joblib import dump
from utils.preprocess import preprocess_data
import matplotlib.pyplot as plt
import os
import json

# Load original training data
df = pd.read_csv('data/agri_dataset_completed.csv')
# df = pd.read_csv('data/main_dataset.csv')
df = preprocess_data(df)

# Try loading user feedback if available
feedback_path = 'data/feedback_log.csv'
if os.path.exists(feedback_path):
    feedback_df = pd.read_csv(feedback_path)
    feedback_df = preprocess_data(feedback_df)
    
    # Assign weights (optional): satisfied = 2, not_satisfied = 1
    feedback_df['weight'] = feedback_df['feedback'].apply(lambda x: 2 if x == 'satisfied' else 1)

    # Drop feedback column before merging
    feedback_df.drop(columns=['feedback'], inplace=True)

    # Add a default weight column to original data
    df['weight'] = 1

    # Combine original data with feedback data
    df = pd.concat([df, feedback_df], ignore_index=True)
else:
    df['weight'] = 1


# df['weight'] = 1

# Split features and labels
# Replace 'price' with 'market_price'
X = df.drop('market_price', axis=1)
y = df['market_price']

sample_weights = df['weight']

# Train-test split (only for internal evaluation)
X_train, X_test, y_train, y_test, w_train, w_test = train_test_split(
    X, y, sample_weights, test_size=0.1, random_state=42
)


# Train the model with weights
model = xgb.XGBRegressor()
model.fit(X_train, y_train, sample_weight=w_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)


print("MSE:", mse)
print("R² Score:", r2)

# Save model
dump(model, 'model/model_xgboost.pkl')
print("Model saved to model/model_xgboost.pkl")

# Save metrics to JSON
metrics = {
    'mse': round(mse, 4),
    'r2': round(r2, 4)
}

with open('model/metrics_xgboost.json', 'w') as f:
    json.dump(metrics, f, indent=4)

print("Metrics saved to model/metrics_xgboost.json")


plt.scatter(y_test, y_pred)
plt.xlabel("Actual Price")
plt.ylabel("Predicted Price")
plt.title("Actual vs Predicted")
plt.show()

