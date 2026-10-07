import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login first");
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/dashboard/${user.user_id}`
      );

      setDashboard(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  const cropCount =
    dashboard.predictions.filter(
      p => p.prediction_type === "crop"
    ).length;

  const fertilizerCount =
    dashboard.predictions.filter(
      p => p.prediction_type === "fertilizer"
    ).length;

  const yieldCount =
    dashboard.predictions.filter(
      p => p.prediction_type === "yield"
    ).length;

  return (
    <div style={{ padding: "20px" }}>

      <h1>📊 Farmer Dashboard</h1>

      <h2>
        Total Predictions: {dashboard.total_predictions}
      </h2>

      <h3>
        🌱 Crop Predictions: {cropCount}
      </h3>

      <h3>
        🧪 Fertilizer Predictions: {fertilizerCount}
      </h3>

      <h3>
        📈 Yield Predictions: {yieldCount}
      </h3>

    </div>
  );
}

export default Dashboard;