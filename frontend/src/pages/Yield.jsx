import React, { useState } from "react";
import axios from "axios";

function Yield() {

  const [formData, setFormData] = useState({
    user_id: localStorage.getItem("user_id"),
    State: "",
    District: "",
    Crop: "",
    Year: "",
    Season: "",
    Area: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const predictYield = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/predict-yield",
        formData
      );

      setResult(response.data.predicted_yield);

    } catch (error) {

      alert("Prediction Failed");
      console.log(error);

    }

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>📈 Yield Prediction</h1>

      <input
        name="State"
        placeholder="State"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="District"
        placeholder="District"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="Crop"
        placeholder="Crop"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="Year"
        placeholder="Year"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="Season"
        placeholder="Season"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="Area"
        placeholder="Area"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={predictYield}>
        Predict Yield
      </button>

      <br /><br />

      {result && (
        <h2>
          Predicted Yield: 📈 {result}
        </h2>
      )}

    </div>
  );
}

export default Yield;