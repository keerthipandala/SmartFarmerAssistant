
import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../styles/Fertilizer.css";

function Fertilizer() {
  const storedUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soil_type: "",
    crop_type: "",
    nitrogen: "",
    potassium: "",
    phosphorous: "",
  });

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const predictFertilizer = async (e) => {
    e.preventDefault();
    setResult("");
    setError("");

    if (Object.values(formData).some((value) => value === "")) {
      setError("Please complete all fields before continuing.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_id: Number(user.user_id),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        moisture: Number(formData.moisture),
        soil_type: formData.soil_type,
        crop_type: formData.crop_type,
        nitrogen: Number(formData.nitrogen),
        potassium: Number(formData.potassium),
        phosphorous: Number(formData.phosphorous),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/predict-fertilizer",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );


      setResult(
        response.data.recommended_fertilizer ||
        response.data.fertilizer ||
        ""
      );

      if (
        !response.data.recommended_fertilizer &&
        !response.data.fertilizer
      ) {
        setError("The prediction completed, but no fertilizer was returned.");
      }
    } catch (err) {
      console.error("Fertilizer prediction error:", err);

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : detail
            ? JSON.stringify(detail)
            : "Prediction failed. Please check the backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "temperature",
      label: "Temperature",
      unit: "°C",
      placeholder: "e.g. 25",
      hint: "Temperature of the surrounding environment",
      type: "number",
    },
    {
      name: "humidity",
      label: "Humidity",
      unit: "%",
      placeholder: "e.g. 50",
      hint: "Relative humidity",
      type: "number",
    },
    {
      name: "moisture",
      label: "Soil moisture",
      unit: "Dataset unit",
      placeholder: "Enter moisture value",
      hint: "Moisture value used by the fertilizer model",
      type: "number",
    },
    {
      name: "soil_type",
      label: "Soil type",
      unit: "",
      hint: "Choose the soil type for your field",
      type: "select",
      options: ["Black", "Clayey", "Loamy", "Red", "Sandy"],
    },
    {
      name: "crop_type",
      label: "Crop type",
      unit: "",
      hint: "Select the crop you are growing",
      type: "select",
      options: [
        "Barley",
        "Cotton",
        "Ground Nuts",
        "Maize",
        "Millets",
        "Oil seeds",
        "Paddy",
        "Pulses",
        "Sugarcane",
        "Tobacco",
        "Wheat",
      ],
    },
    {
      name: "nitrogen",
      label: "Nitrogen",
      unit: "Dataset unit",
      placeholder: "e.g. 50",
      hint: "Nitrogen value used by the model",
      type: "number",
    },
    {
      name: "potassium",
      label: "Potassium",
      unit: "Dataset unit",
      placeholder: "e.g. 50",
      hint: "Potassium value used by the model",
      type: "number",
    },
    {
      name: "phosphorous",
      label: "Phosphorus",
      unit: "Dataset unit",
      placeholder: "e.g. 50",
      hint: "Enter the phosphorus value",
      type: "number",
    },
  ];

  return (
    <main className="fert-page">
      <div className="fert-heading">
        <span className="fert-eyebrow">SMART FARMING TOOLKIT</span>
        <h1>🧪 Fertilizer Recommendation</h1>
        <p>
          Find a suitable fertilizer recommendation using your soil,
          crop, and environmental information.
        </p>
      </div>

      <form className="fert-card" onSubmit={predictFertilizer}>
        <div className="fert-card-heading">
          <div className="fert-heading-icon">🧑‍🌾</div>
          <div>
            <h2>Soil &amp; crop details</h2>
            <p>Enter the available measurements for your field.</p>
          </div>
        </div>

        <div className="fert-divider" />

        <div className="fert-grid">
          {fields.map((field) => (
            <div className="fert-field" key={field.name}>
              <div className="fert-label-row">
                <label htmlFor={field.name}>{field.label}</label>
                {field.unit && (
                  <span className="fert-unit">{field.unit}</span>
                )}
              </div>

              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type="number"
                  step="any"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              )}

              <small>{field.hint}</small>
            </div>
          ))}
        </div>

        {error && (
          <div className="fert-error" role="alert">
            {error}
          </div>
        )}

        <button className="fert-submit" type="submit" disabled={loading}>
          {loading ? (
            "Analysing your field..."
          ) : (
            <>🧪 &nbsp; Recommend Fertilizer &nbsp; →</>
          )}
        </button>

        <p className="fert-form-note">
          Use measurements consistent with your dataset.
        </p>

        {result && (
          <section className="fert-result" aria-live="polite">
            <div className="fert-result-icon">🌿</div>
            <div>
              <span className="fert-result-label">
                YOUR RECOMMENDATION
              </span>
              <h2>{result}</h2>
              <p>
                This is the fertilizer predicted by your machine learning
                model for the details you entered.
              </p>
            </div>
          </section>
        )}
      </form>

      <p className="fert-footer">
        Smart Farmer Assistant · Data-driven farming insights
      </p>
    </main>
  );
}

export default Fertilizer;
