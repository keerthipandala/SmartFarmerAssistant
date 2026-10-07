import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function History() {
    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/login" />;
    }

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login first");
        return;
      }

      const userId = user.user_id;

      const response = await axios.get(
        `http://127.0.0.1:8000/predictions/${userId}`
      );

      setPredictions(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>📜 Prediction History</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>

          {predictions.map((item) => (

            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.prediction_type}</td>
              <td>{item.result}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default History;