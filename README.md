# 🌾 Crop Price Prediction App

🌾 Crop Price Prediction App – Predicts market prices of crops using an XGBoost model trained on agri-data. Built with a Flask backend and a React frontend, with user feedback support for continuous improvement.

Predict the market price of crops based on environmental and agricultural inputs using machine learning! This full-stack web application is built with a **Flask + XGBoost** backend and a **React** frontend. Users can input crop data and get price predictions — and even provide feedback to help improve future predictions.

---

## 🚀 Getting Started

### 🔧 Clone the Repo

```bash
git clone https://github.com/your-username/crop-price-predictor.git
cd crop-price-predictor


## ⚙️ Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Frontend   | React.js (with Vite)       |
| Backend    | Python (Flask / FastAPI)   |
| ML Model   | scikit-learn, pandas, numpy|
| Styling    | TailwindCSS / CSS          |
| Others     | Axios, Chart.js, etc       |
|-----------------------------------------|
---

## ✨ Features

- 🔍 **Crop Price Prediction** using an XGBoost regression model
- 🧠 **ML Model Trained** on real-world agricultural data
- ♻️ **User Feedback Integration** to log satisfaction and help retrain the model over time
- ⚡ **React Frontend** for a modern, responsive interface
- 🧪 **Modular Code** with reusable preprocessing utilities
- 🔐 Virtual environment support (Python)

---

## 📁 Project Structure

crop-price-app/
├── backend/ # Flask server, model, preprocessing
│ ├── model/ # Trained model (model.pkl)
│ ├── utils/ # Preprocessing logic
│ ├── venv/ # Python virtual environment (ignored)
│ ├── app.py # Main Flask API
│ └── requirements.txt
├── frontend/ # React app
│ ├── public/
│ ├── src/
│ └── ...
├── data/ # CSV data and logs
├── .gitignore
└── README.md


---

## 🚀 Getting Started

Follow these steps to run the app locally:

### 🔧 Backend Setup (Flask + ML)

```bash
cd backend
python -m venv venv               # Create virtual environment
source venv/bin/activate          # On Windows: venv\Scripts\activate
pip install -r requirements.txt   # Install Python dependencies
python app.py                     # Run Flask server



###  By default, the server will start at:
http://localhost:5000



### 🔧 Backend Setup (ReactJS)

cd frontend
npm install                       # Install Node.js dependencies
npm run dev                       # Start development server
