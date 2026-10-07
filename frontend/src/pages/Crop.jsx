import React, { useState } from "react";
import axios from "axios";

function Crop() {

  const [formData, setFormData] = useState({
    user_id: localStorage.getItem("user_id"),
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const predictCrop = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/predict-crop",
        formData
      );

      setResult(response.data.recommended_crop);

    } catch (error) {

      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Prediction Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>🌱 Crop Recommendation</h1>

      <input
        type="number"
        name="N"
        placeholder="Nitrogen (N)"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="P"
        placeholder="Phosphorus (P)"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="K"
        placeholder="Potassium (K)"
        onChange={handleChange}
      />
      <br /><br />

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
        name="ph"
        placeholder="pH"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="rainfall"
        placeholder="Rainfall"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={predictCrop}>
        Predict Crop
      </button>

      <br /><br />

      {result && (
        <h2>
          Recommended Crop: 🌾 {result}
        </h2>
      )}

    </div>
  );
}

export default Crop;