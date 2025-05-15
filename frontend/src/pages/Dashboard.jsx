import React, { useState } from "react";
import "../App.css";
import GraphBox from "../components/GraphBox";
import Header from "../components/Header";

function Dashboard() {
  const [formData, setFormData] = useState({
    cropName: "",
    region: "",
    year: "",
    month: "",
    marketPrice: "",
    rainfall: "",
    variety: "",
    areaSown: "",
    yield: "",
    irrigated: "",
    fertilizer: "",
    msp: "",
    marketDemand: "",
    exportDemand: "",
    inputCost: "",
    transportCost: "",
    govtScheme: "",
    coldStorage: "",
    mandiOpen: "",
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
  
    const data = {
      cropName,
      region,
      year,
      month,
      marketPrice,
      rainfall,
      cropVariety,
      areaSown,
      yieldVal,
      irrigatedPercent,
      fertilizerUsed,
      mspAvailable,
      marketDemand,
      exportDemand,
      inputCost,
      transportCost,
      govtScheme,
      coldStorage,
      mandiOpen,
    };
  
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Server response:", result);
  
      setPredictedPrice(result.predicted_price);
      setPrevPrice(result.prev_price);
      setAccuracy(result.accuracy);
      setTimeElapsed(result.time_elapsed);
  
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };
  


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       "http://192.168.31.64:7500/api/model/predict",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     const result = await response.json();
  //     console.log("Server Response:", result);
  //   } catch (error) {
  //     console.error("Prediction API Error:", error);
  //   }
  // };

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
                <label>
                  Crop Name
                  <select
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select crop</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Corn</option>
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
                    placeholder="e.g. 2025"
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
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>...</option>
                  </select>
                </label>

                <label>
                  Market Price (₹/kg)
                  <input
                    type="number"
                    name="marketPrice"
                    value={formData.marketPrice}
                    onChange={handleChange}
                    placeholder="Enter market price"
                    required
                  />
                </label>

                <label>
                  Rainfall (mm)
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    placeholder="e.g. 120"
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
                    placeholder="Enter variety"
                    required
                  />
                </label>

                <label>
                  Area Sown (hectare)
                  <input
                    type="number"
                    name="areaSown"
                    value={formData.areaSown}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

                <label>
                  Yield (kg/hectare)
                  <input
                    type="number"
                    name="yield"
                    value={formData.yield}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

                <label>
                  Irrigated %
                  <input
                    type="number"
                    name="irrigated"
                    value={formData.irrigated}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

                <label>
                  Fertilizer Used (kg)
                  <input
                    type="number"
                    name="fertilizer"
                    value={formData.fertilizer}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

                <label>
                  MSP Available?
                  <select
                    name="msp"
                    value={formData.msp}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <label>
                  Market Demand
                  <select
                    name="marketDemand"
                    value={formData.marketDemand}
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
                    name="exportDemand"
                    value={formData.exportDemand}
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
                    name="inputCost"
                    value={formData.inputCost}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

                <label>
                  Transport Cost (₹)
                  <input
                    type="number"
                    name="transportCost"
                    value={formData.transportCost}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

                <label>
                  Govt Scheme Active?
                  <select
                    name="govtScheme"
                    value={formData.govtScheme}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <label>
                  Cold Storage Available?
                  <select
                    name="coldStorage"
                    value={formData.coldStorage}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <label>
                  Mandi Open?
                  <select
                    name="mandiOpen"
                    value={formData.mandiOpen}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <button type="submit">Predict</button>
              </form>
            </div>

            {/* Output Section */}
            <div className="result-section">
              <div className="result-card">
                <h3>Price Comparison Graph</h3>
                <div className="graph">[Your Graph Here]</div>

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
