import React, { useState } from "react";
import axios from "axios";

function Fertilizer() {

  const [formData, setFormData] = useState({
    user_id: localStorage.getItem("user_id"),
    temperature: "",
    humidity: "",
    moisture: "",
    soil_type: "",
    crop_type: "",
    nitrogen: "",
    potassium: "",
    phosphorous: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const predictFertilizer = async () => {
    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/predict-fertilizer",
        formData
      );

      setResult(response.data.recommended_fertilizer);

    } catch (error) {

      alert("Prediction Failed");
      console.log(error);

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>🧪 Fertilizer Recommendation</h1>

      <input
        type="number"
        name="temperature"
        placeholder="Temperature"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="humidity"
        placeholder="Humidity"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="moisture"
        placeholder="Moisture"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="soil_type"
        placeholder="Soil Type"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="crop_type"
        placeholder="Crop Type"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="nitrogen"
        placeholder="Nitrogen"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="potassium"
        placeholder="Potassium"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="phosphorous"
        placeholder="Phosphorous"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={predictFertilizer}>
        Predict Fertilizer
      </button>

      <br /><br />

      {result && (
        <h2>
          Recommended Fertilizer: 🧪 {result}
        </h2>
      )}

    </div>
  );
}

export default Fertilizer;