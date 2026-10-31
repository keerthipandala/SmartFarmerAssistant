
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.user_id || !user?.access_token) {
      setError("Please log in again to access your dashboard.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/dashboard/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((err) => {
        console.error("Dashboard API error:", err.response?.data || err.message);
        setError(
          err.response?.status === 401
            ? "Your session has expired. Please log in again."
            : "Unable to load your dashboard. Please try again."
        );
      })
      .finally(() => setLoading(false));
  }, [user?.user_id, user?.access_token]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const predictions = dashboard?.predictions || [];

  const cropCount = predictions.filter(
    (item) => item.prediction_type === "crop"
  ).length;

  const fertilizerCount = predictions.filter(
    (item) => item.prediction_type === "fertilizer"
  ).length;

  const yieldCount = predictions.filter(
    (item) => item.prediction_type === "yield"
  ).length;

  const totalCount = dashboard?.total_predictions ?? predictions.length;

  const actions = [
    {
      icon: "🌱",
      title: "Crop Recommendation",
      description: "Find suitable crops using soil and climate values.",
      path: "/crop",
      color: "dash-green",
    },
    {
      icon: "🧪",
      title: "Fertilizer Recommendation",
      description: "Get fertilizer suggestions for your crop and soil.",
      path: "/fertilizer",
      color: "dash-orange",
    },
    {
      icon: "🌾",
      title: "Crop Yield Prediction",
      description: "Estimate crop yield using available farm details.",
      path: "/yield",
      color: "dash-blue",
    },
    {
      icon: "🌤️",
      title: "Weather Information",
      description: "Check current weather conditions for a city.",
      path: "/weather",
      color: "dash-teal",
    },
  ];

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">SMART FARMER ASSISTANT</span>
            <h1>Welcome back, {user.name || "Farmer"}! 👋</h1>
            <p>
              Explore farming insights, get recommendations, and review your
              saved predictions.
            </p>
          </div>
          <div className="dashboard-welcome-icon">🌿</div>
        </section>

        {loading ? (
          <div className="dashboard-message">Loading your dashboard...</div>
        ) : error ? (
          <div className="dashboard-message dashboard-error">{error}</div>
        ) : (
          <>
            <section className="dashboard-stats">
              <article className="dashboard-stat dashboard-stat-total">
                <span className="dashboard-stat-icon">📊</span>
                <div>
                  <p>Total predictions</p>
                  <strong>{totalCount}</strong>
                </div>
              </article>

              <article className="dashboard-stat">
                <span className="dashboard-stat-icon dash-green-bg">🌱</span>
                <div>
                  <p>Crop predictions</p>
                  <strong>{cropCount}</strong>
                </div>
              </article>

              <article className="dashboard-stat">
                <span className="dashboard-stat-icon dash-orange-bg">🧪</span>
                <div>
                  <p>Fertilizer predictions</p>
                  <strong>{fertilizerCount}</strong>
                </div>
              </article>

              <article className="dashboard-stat">
                <span className="dashboard-stat-icon dash-blue-bg">🌾</span>
                <div>
                  <p>Yield predictions</p>
                  <strong>{yieldCount}</strong>
                </div>
              </article>
            </section>

            <section className="dashboard-section">
              <div className="dashboard-section-heading">
                <div>
                  <h2>Farming tools</h2>
                  <p>Choose a tool to get started.</p>
                </div>
              </div>

              <div className="dashboard-tools">
                {actions.map((action) => (
                  <Link
                    to={action.path}
                    className="dashboard-tool"
                    key={action.path}
                  >
                    <span className={`dashboard-tool-icon ${action.color}`}>
                      {action.icon}
                    </span>
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                    <span className="dashboard-tool-link">
                      Open tool <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="dashboard-section dashboard-history-section">
              <div className="dashboard-section-heading">
                <div>
                  <h2>Recent predictions</h2>
                  <p>Your latest saved farming results.</p>
                </div>
                <Link to="/history" className="dashboard-view-all">
                  View all →
                </Link>
              </div>

              {predictions.length === 0 ? (
                <div className="dashboard-empty">
                  No recent predictions yet. Try one of the farming tools above.
                </div>
              ) : (
                <div className="dashboard-table-wrapper">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Result</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions.slice(0, 5).map((item, index) => (
                        <tr key={item.id ?? index}>
                          <td>{item.prediction_type || "Prediction"}</td>
                          <td className="dashboard-result">
                            {item.result ?? "—"}
                          </td>
                          <td>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString()
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
