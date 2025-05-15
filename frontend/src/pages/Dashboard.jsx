import React, { useState } from "react";
import "../App.css";
import GraphBox from "../components/GraphBox";
import Header from "../components/Header";

function Dashboard() {
  const [formData, setFormData] = useState({
    crop_name: "",
    region: "",
    year: "",
    month: "",
    rainfall: "",
    crop_variety: "",
    area_sown: "",
    yield: "",
    irrigated_percent: "",
    fertilizer_used: "",
    msP: "",
    market_demand: "",
    export_demand: "",
    input_cost: "",
    transport_cost: "",
    govt_scheme_active: "",
    cold_storage_available: "",
    mandi_open: "",
    modelChoice: "xgboost",
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    crop_name,
    region,
    year,
    month,
    rainfall,
    crop_variety,
    area_sown,
    yield: yield_kg,
    irrigated_percent,
    fertilizer_used,
    msP,
    market_demand,
    export_demand,
    input_cost,
    transport_cost,
    govt_scheme_active,
    cold_storage_available,
    mandi_open,
  } = formData;

  // Compose cleaned-up data with proper types
  const data = {
    crop_name: crop_name,
    region: region,
    year: Number(year),
    month: Number(month),
    rainfall: parseFloat(rainfall),
    crop_variety,
    area_sown: parseFloat(area_sown),
    yield: parseFloat(yield_kg),
    irrigated_percent: parseFloat(irrigated_percent),
    fertilizer_used: parseFloat(fertilizer_used),
    msP: parseFloat(msP),
    market_demand: parseFloat(market_demand),
    export_demand: parseFloat(export_demand),
    input_cost: parseFloat(input_cost),
    transport_cost: parseFloat(transport_cost),
    govt_scheme_active: govt_scheme_active.toLowerCase(),
    cold_storage_available: cold_storage_available.toLowerCase(),
    mandi_open: mandi_open.toLowerCase(),
  };

  const endpoint = "http://localhost:5000/api/model/xgboost/predict/";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server response:", result);

    setPredictedPrice(result.predicted_price);
    setAccuracy(result.model_r2_score);
    setTimeElapsed(result.elapsed_time_sec);
  } catch (error) {
    console.error("Prediction failed:", error);
  }
};


  return (
    <div className="container">
      <main className="main-content">
        <Header />

        <section className="content-area">
          <div className="main-content-container">
            {/* Input Section */}
            <div className="input-card">
              <h2>Crop Prediction</h2>
              <form className="input-form" onSubmit={handleSubmit}>
                <div className="form-group model-selector">
                  <label className="form-label">Select Model</label>
                  <div className="radio-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="modelChoice"
                        value="xgboost"
                        checked={formData.modelChoice === "xgboost"}
                        onChange={handleChange}
                      />
                      XGBoost
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="modelChoice"
                        value="randomforest"
                        checked={formData.modelChoice === "randomforest"}
                        onChange={handleChange}
                      />
                      Random Forest
                    </label>
                  </div>
                </div>

                <label>
                  Crop Name
                  <select
                    name="crop_name"
                    value={formData.crop_name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select crop</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Corn</option>
                    {/* Add more if needed */}
                  </select>
                </label>

                <label>
                  Region
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select region</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                  </select>
                </label>

                <label>
                  Year
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Month
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Rainfall (mm)
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Crop Variety
                  <input
                    type="text"
                    name="variety"
                    value={formData.variety}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Area Sown (hectare)
                  <input
                    type="number"
                    name="area_sown"
                    value={formData.area_sown}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Yield (kg/hectare)
                  <input
                    type="number"
                    name="yield_kg_per_hectare"
                    value={formData.yield_kg_per_hectare}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Irrigated Area (%)
                  <input
                    type="number"
                    name="irrigated_percent"
                    value={formData.irrigated_percent}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Fertilizer Used (kg)
                  <input
                    type="number"
                    name="fertilizer_used"
                    value={formData.fertilizer_used}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  MSP Available?
                  <select
                    name="msp_available"
                    value={formData.msp_available}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label>
                  Market Demand
                  <select
                    name="market_demand"
                    value={formData.market_demand}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>

                <label>
                  Export Demand
                  <select
                    name="export_demand"
                    value={formData.export_demand}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>

                <label>
                  Input Cost (₹)
                  <input
                    type="number"
                    name="input_cost"
                    value={formData.input_cost}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Transport Cost (₹)
                  <input
                    type="number"
                    name="transport_cost"
                    value={formData.transport_cost}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Govt Scheme Active?
                  <select
                    name="govt_scheme"
                    value={formData.govt_scheme}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label>
                  Cold Storage Available?
                  <select
                    name="cold_storage"
                    value={formData.cold_storage}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label>
                  Mandi Open?
                  <select
                    name="mandi_open"
                    value={formData.mandi_open}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                {/* <label>
                  Market Price (₹/kg)
                  <input
                    type="number"
                    name="market_price"
                    value={formData.market_price}
                    onChange={handleChange}
                    required
                  />
                </label> */}

                <button type="submit">Predict</button>
              </form>
            </div>

            {/* Output Section */}
            <div className="result-section">
              <div className="result-card">
                <h3>Price Comparison Graph</h3>
                <GraphBox />
              </div>

              <div className="result-card" id="result-text">
                <h3>Prediction Results</h3>
                <div className="block">
                  <p>
                    <strong>Predicted Price:</strong>{" "}
                    {predictedPrice !== null ? `₹${predictedPrice}` : "—"}
                  </p>
                  <p>
                    <strong>Previous Avg Price:</strong>{" "}
                    {prevPrice !== null ? `₹${prevPrice}` : "—"}
                  </p>
                  <p>
                    <strong>Accuracy:</strong>{" "}
                    {accuracy !== null ? `${accuracy}%` : "—"}
                  </p>
                  <p>
                    <strong>Time Taken:</strong>{" "}
                    {timeElapsed !== null ? `${timeElapsed} sec` : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
