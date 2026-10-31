
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../styles/History.css";

function History() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.user_id) {
      setLoading(false);
      return;
    }
    axios
      .get(`http://127.0.0.1:8000/predictions/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        const records = response.data;
        setPredictions(
          Array.isArray(records)
            ? records
            : records.predictions || records.history || []
        );
      })
      .catch(() => {
        setError("Unable to load prediction history. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [user?.user_id]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getTypeClass = (type) => {
    const value = (type || "").toLowerCase();

    if (value.includes("crop")) return "history-crop";
    if (value.includes("fertilizer")) return "history-fertilizer";
    if (value.includes("yield")) return "history-yield";
    if (value.includes("weather")) return "history-weather";

    return "history-other";
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? date
      : parsedDate.toLocaleString();
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <div className="history-heading">
          <div>
            <span className="history-eyebrow">YOUR FARMING ACTIVITY</span>
            <h1>Prediction History</h1>
            <p>
              Review your previous farming predictions and recommendations
              in one place.
            </p>
          </div>

          <div className="history-total">
            <span>Total predictions</span>
            <strong>{predictions.length}</strong>
          </div>
        </div>

        <div className="history-summary">
          <div className="history-stat">
            <span className="stat-icon crop-icon">🌱</span>
            <div>
              <p>Crop</p>
              <strong>
                {predictions.filter((p) =>
                  (p.prediction_type || "").toLowerCase().includes("crop")
                ).length}
              </strong>
            </div>
          </div>

          <div className="history-stat">
            <span className="stat-icon fertilizer-icon">🧪</span>
            <div>
              <p>Fertilizer</p>
              <strong>
                {predictions.filter((p) =>
                  (p.prediction_type || "")
                    .toLowerCase()
                    .includes("fertilizer")
                ).length}
              </strong>
            </div>
          </div>

          <div className="history-stat">
            <span className="stat-icon yield-icon">🌾</span>
            <div>
              <p>Yield</p>
              <strong>
                {predictions.filter((p) =>
                  (p.prediction_type || "").toLowerCase().includes("yield")
                ).length}
              </strong>
            </div>
          </div>
        </div>

        <section className="history-card">
          <div className="history-card-heading">
            <div>
              <h2>All predictions</h2>
              <p>Your saved prediction records</p>
            </div>
          </div>

          {loading ? (
            <div className="history-message">Loading your history...</div>
          ) : error ? (
            <div className="history-message history-error">{error}</div>
          ) : predictions.length === 0 ? (
            <div className="history-empty">
              <span>📋</span>
              <h3>No predictions yet</h3>
              <p>
                Make your first crop, fertilizer, or yield prediction to see it
                here.
              </p>
            </div>
          ) : (
            <div className="history-table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Prediction type</th>
                    <th>Result</th>
                    <th>Date and time</th>
                  </tr>
                </thead>

                <tbody>
                  {predictions.map((item, index) => (
                    <tr key={item.id ?? `${item.prediction_type}-${index}`}>
                      <td>{index + 1}</td>
                      <td>
                        <span
                          className={`history-badge ${getTypeClass(
                            item.prediction_type
                          )}`}
                        >
                          {item.prediction_type || "Prediction"}
                        </span>
                      </td>
                      <td className="history-result">
                        {item.result ?? "—"}
                      </td>
                      <td>{formatDate(item.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default History;
