import React, { useState } from "react";
import axios from "axios";

function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/weather/${city}`
      );

      setWeather(response.data);

    } catch (error) {

      alert("Weather Fetch Failed");
      console.log(error);

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>🌦️ Weather Information</h1>

      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <br /><br />

      <button onClick={getWeather}>
        Get Weather
      </button>

      <br /><br />

      {weather && (
        <div>

          <h2>📍 {weather.city}</h2>

          <p>🌡 Temperature: {weather.temperature} °C</p>

          <p>💧 Humidity: {weather.humidity}%</p>

          <p>🌥 Condition: {weather.description}</p>

        </div>
      )}

    </div>
  );
}

export default Weather;