from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS
import pandas as pd
from joblib import load
from utils.preprocess import preprocess_data
import numpy as np
import time
import json

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes and origins


@app.route('/api/', methods=['GET'])
def api():
    return jsonify({
        'predicted_price': "hello",
    })

@app.route('/api/model/xgboost/predict/', methods=['POST'])
def predict_xgboost():
    print("Catched one request.")

    model = load('model/model_xgboost.pkl')
    # Load accuracy (R² score) from JSON
    with open('model/metrics_xgboost.json', 'r') as f:
        metrics = json.load(f)
        model_r2 = round(metrics.get('r2', 0), 4)  # Default to 0 if not found
        data = request.get_json()
        df = pd.DataFrame([data])
        df = preprocess_data(df)

    # ✅ Fix: Add weight column with default value
    df['weight'] = 1

    # Time tracking
    start_time = time.time()
    prediction = model.predict(df)[0]
    end_time = time.time()
    elapsed_time = round(end_time - start_time, 4)

    return jsonify({
        'predicted_price': round(float(prediction), 2),
        'elapsed_time_sec': elapsed_time,
        'model_r2_score': model_r2
    })

@app.route('/api/model/randomforest/predict/', methods=['POST'])
def predict_randomforest():
    print("Catched one request.")

    model = load('model/model_randomforest.pkl')
    # Load accuracy (R² score) from JSON
    with open('model/metrics_randomforest.json', 'r') as f:
        metrics = json.load(f)
        model_r2 = round(metrics.get('r2', 0), 4)  # Default to 0 if not found
        data = request.get_json()
        df = pd.DataFrame([data])
        df = preprocess_data(df)

    data = request.get_json()
    df = pd.DataFrame([data])
    df = preprocess_data(df)

    # ✅ Fix: Add weight column with default value
    df['weight'] = 1

    # Time tracking
    start_time = time.time()
    prediction = model.predict(df)[0]
    end_time = time.time()
    elapsed_time = round(end_time - start_time, 4)

    return jsonify({
        'predicted_price': round(float(prediction), 2),
        'elapsed_time_sec': elapsed_time,
        'model_r2_score': model_r2
    })

if __name__ == '__main__':
    app.run(debug=True)

