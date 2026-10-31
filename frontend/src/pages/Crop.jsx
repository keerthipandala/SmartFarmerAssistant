import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import "../styles/Crop.css";

function Crop() {
  const storedUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const fields = [
    {
      name: "N",
      label: "Nitrogen",
      symbol: "N",
      unit: "mg/kg",
      placeholder: "e.g. 50",
      description: "Nitrogen available in the soil",
    },
    {
      name: "P",
      label: "Phosphorus",
      symbol: "P",
      unit: "mg/kg",
      placeholder: "e.g. 50",
      description: "Phosphorus available in the soil",
    },
    {
      name: "K",
      label: "Potassium",
      symbol: "K",
      unit: "mg/kg",
      placeholder: "e.g. 50",
      description: "Potassium available in the soil",
    },
    {
      name: "temperature",
      label: "Temperature",
      symbol: "🌡️",
      unit: "°C",
      placeholder: "e.g. 25",
      description: "Current temperature",
    },
    {
      name: "humidity",
      label: "Humidity",
      symbol: "💧",
      unit: "%",
      placeholder: "e.g. 50",
      description: "Relative humidity",
    },
    {
      name: "ph",
      label: "Soil pH",
      symbol: "⚗️",
      unit: "pH",
      placeholder: "e.g. 7",
      description: "Soil acidity or alkalinity",
    },
    {
      name: "rainfall",
      label: "Rainfall",
      symbol: "🌧️",
      unit: "mm",
      placeholder: "e.g. 100",
      description: "Expected rainfall",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setResult("");
  };

  const predictCrop = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      setError("Please complete all fields before predicting.");
      return;
    }

    if (Object.values(formData).some((value) => !Number.isFinite(Number(value)))) {
      setError("Please enter valid numeric values in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const payload = {
        user_id: Number(user.user_id),
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall),
      };

      const response = await axios.post(
      "http://127.0.0.1:8000/predict-crop",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );


      setResult(
        response.data.recommended_crop ||
          response.data.crop ||
          "Prediction completed, but no crop name was returned."
      );
    } catch (err) {
      console.error("Crop prediction error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to predict the crop. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="crop-page">
      <section className="crop-banner">
        <div className="crop-banner-content">
          <span className="crop-eyebrow">🌿 SMART FARMING TOOL</span>
          <h1>Find the right crop for your soil.</h1>
          <p>
            Enter your soil nutrients and environmental conditions to get
            a crop recommendation from your machine learning model.
          </p>

          <div className="crop-banner-points">
            <span>✓ Soil nutrient analysis</span>
            <span>✓ Climate information</span>
            <span>✓ AI-powered recommendation</span>
          </div>
        </div>

        <div className="crop-banner-icon" aria-hidden="true">
          🌱
          <span>Grow with confidence</span>
        </div>
      </section>

      <div className="crop-layout">
        <section className="crop-form-card">
          <div className="crop-section-heading">
            <div className="crop-heading-icon">🧑‍🌾</div>
            <div>
              <h2>Soil & climate details</h2>
              <p>Enter the available measurements for your field.</p>
            </div>
          </div>

          <form onSubmit={predictCrop}>
            <div className="crop-input-grid">
              {fields.map((field) => (
                <div className="crop-field" key={field.name}>
                  <label htmlFor={field.name}>
                    <span>{field.label}</span>
                    <span className="crop-field-unit">{field.unit}</span>
                  </label>

                  <div className="crop-input-wrap">
                    <input
                      id={field.name}
                      type="number"
                      step="any"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <small>{field.description}</small>
                </div>
              ))}
            </div>

            {error && (
              <div className="crop-error" role="alert">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button
              className="crop-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="crop-spinner" />
                  Analysing your field...
                </>
              ) : (
                <>🌱 Predict Suitable Crop <span>→</span></>
              )}
            </button>

            <p className="crop-form-note">
              Please use measurements in the units shown above.
            </p>
          </form>
        </section>

        <aside className="crop-side-panel">
          <div className="crop-side-art">🌾</div>
          <span className="crop-side-label">YOUR FARMING ASSISTANT</span>
          <h2>Better decisions begin with better insights.</h2>
          <p>
            Soil nutrients, temperature, humidity, pH, and rainfall help
            your model identify a suitable crop.
          </p>

          <div className="crop-side-divider" />

          <div className="crop-side-tip">
            <span>💡</span>
            <div>
              <strong>Tip for better results</strong>
              <p>
                Enter accurate field measurements. The recommendation
                depends on the data supplied to the model.
              </p>
            </div>
          </div>

          <Link to="/weather" className="crop-weather-link">
            Check current weather <span>→</span>
          </Link>
        </aside>
      </div>

      {result && (
        <section className="crop-result-card" aria-live="polite">
          <div className="crop-result-icon">🌾</div>
          <div className="crop-result-content">
            <span className="crop-result-label">YOUR MODEL'S RECOMMENDATION</span>
            <h2>Recommended Crop</h2>
            <p className="crop-result-name">{result}</p>
            <p>
              Your crop prediction is complete. You can view your saved
              predictions in your history.
            </p>
            <Link to="/history" className="crop-result-link">
              View prediction history →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default Crop;