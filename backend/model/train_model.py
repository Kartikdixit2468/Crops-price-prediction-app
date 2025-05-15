import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from joblib import dump
from utils.preprocess import preprocess_data
import os

# Load original training data
df = pd.read_csv('data/crop_data1.csv')
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
    # If no feedback yet, just set uniform weight
    df['weight'] = 1

# Split features and labels
X = df.drop('price', axis=1)
y = df['price']
sample_weights = df['weight']

# Train-test split (only for internal evaluation)
X_train, X_test, y_train, y_test, w_train, w_test = train_test_split(
    X, y, sample_weights, test_size=0.2, random_state=42
)

# Train the model with weights
model = xgb.XGBRegressor()
model.fit(X_train, y_train, sample_weight=w_train)

# Evaluate
y_pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, y_pred))

# Save
dump(model, 'model/model.pkl')
print("Model saved to model/model.pkl")
