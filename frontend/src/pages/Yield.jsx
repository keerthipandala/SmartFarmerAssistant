
import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../styles/Yield.css";

function Yield() {
  const storedUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    state: "",
    district: "",
    crop: "",
    year: "2023",
    season: "",
    area: "",
  });

  const [result, setResult] = useState(null);
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

  const predictYield = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (Object.values(formData).some((value) => value.trim() === "")) {
      setError("Please complete all fields before continuing.");
      return;
    }

    if (Number(formData.year) < 1900 || Number(formData.year) > 2100) {
      setError("Please enter a valid year.");
      return;
    }

    if (Number(formData.area) <= 0) {
      setError("Area must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_id: Number(user.user_id),
        State: formData.state.trim(),
        District: formData.district.trim(),
        Crop: formData.crop.trim(),
        Year: Number(formData.year),
        Season: formData.season,
        Area: Number(formData.area),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/predict-yield",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error("Yield prediction error:", err);

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : detail
            ? JSON.stringify(detail)
            : "Yield prediction failed. Please check the backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "state",
      label: "State",
      placeholder: "e.g. Telangana",
      hint: "State where the farm is located",
      type: "text",
    },
    {
      name: "district",
      label: "District",
      placeholder: "e.g. Hyderabad",
      hint: "District of the agricultural field",
      type: "text",
    },
    {
      name: "crop",
      label: "Crop",
      placeholder: "e.g. Rice",
      hint: "Use a crop name supported by the dataset",
      type: "text",
    },
    {
      name: "year",
      label: "Year",
      placeholder: "e.g. 2023",
      hint: "Agricultural year for the prediction",
      type: "number",
    },
    {
      name: "season",
      label: "Growing season",
      placeholder: "Select season",
      hint: "Choose the season used in your dataset",
      type: "select",
      options: ["Kharif", "Rabi", "Whole Year", "Summer", "Winter", "Autumn"],
    },
    {
      name: "area",
      label: "Cultivated area",
      unit: "Dataset unit",
      placeholder: "Enter cultivated area",
      hint: "Area used for growing the selected crop",
      type: "number",
    },
  ];

  const predictedYield =
    result?.predicted_yield ?? result?.yield_prediction;

  return (
    <main className="yield-page">
      <header className="yield-heading">
        <span className="yield-eyebrow">SMART FARMING TOOLKIT</span>
        <h1>📊 Crop Yield Prediction</h1>
        <p>
          Estimate crop yield using agricultural location, crop,
          growing season, year, and cultivated area.
        </p>
      </header>

      <form className="yield-card" onSubmit={predictYield}>
        <div className="yield-card-heading">
          <div className="yield-heading-icon">🌾</div>
          <div>
            <h2>Farm &amp; cultivation details</h2>
            <p>Provide the details of the crop you want to analyse.</p>
          </div>
        </div>

        <div className="yield-divider" />

        <div className="yield-grid">
          {fields.map((field) => (
            <div className="yield-field" key={field.name}>
              <div className="yield-label-row">
                <label htmlFor={field.name}>{field.label}</label>
                {field.unit && (
                  <span className="yield-unit">{field.unit}</span>
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
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  step={field.name === "area" ? "any" : undefined}
                  min={field.name === "area" ? "0.01" : undefined}
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
          <div className="yield-error" role="alert">
            {error}
          </div>
        )}

        <button className="yield-submit" type="submit" disabled={loading}>
          {loading
            ? "Calculating estimated yield..."
            : "📊  Predict Crop Yield  →"}
        </button>

        <p className="yield-form-note">
          Predictions depend on the coverage and quality of your training data.
        </p>

        {result && (
          <section className="yield-result" aria-live="polite">
            <div className="yield-result-icon">🌱</div>
            <div className="yield-result-content">
              <span className="yield-result-label">
                YOUR PREDICTED CROP YIELD
              </span>
              {predictedYield !== undefined && predictedYield !== null ? (
                <h2>
                  {Number.isFinite(Number(predictedYield))
                    ? Number(predictedYield).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    : String(predictedYield)}
                  <span>
                    {" "}{result.unit || "tonnes/hectare"}
                  </span>
                </h2>
              ) : (
                <h2>Prediction received</h2>
              )}
              <p>
                {result.message ||
                  "Your yield prediction has been processed and saved."}
              </p>
            </div>
          </section>
        )}
      </form>

      <p className="yield-footer">
        Smart Farmer Assistant · Data-driven farming insights
      </p>
    </main>
  );
}

export default Yield;
