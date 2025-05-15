import requests
import json

# URL of the localhost server
url = 'http://127.0.0.1:5000/api/predict'  # Replace 'your-endpoint' with the actual endpoint

# Sample JSON data to send in the POST request
data = {
  "crop": "Wheat",
  "region": "North",
  "year": 2023,
  "month": 11,
  "market_price": 2100,
  "rainfall": 130,
  "variety": "A1",
  "area_sown": 400,
  "yield": 2600,
  "irrigated": 85,
  "fertilizer": 290,
  "msp": "Yes",
  "market_demand": "High",
  "export_demand": "Medium",
  "input_cost": 950,
  "transport_cost": 190,
  "govt_scheme": "Yes",
  "cold_storage": "Yes",
  "mandi_open": "Yes"
}

# Sending POST request with the JSON data
response = requests.post(url, json=data)

# Checking if the request was successful
if response.status_code == 200:
    print("Response from server:", response.json())
else:
    print(f"Failed to get a response. Status Code: {response.status_code}")
