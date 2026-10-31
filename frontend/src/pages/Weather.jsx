
import React, { useState } from "react";
import axios from "axios";
import "../styles/Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();

    const cityName = city.trim();

    if (!cityName) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/weather/${encodeURIComponent(cityName)}`
      );

      setWeather(response.data);
    } catch (err) {
      console.error("Weather fetch error:", err);

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : detail
            ? JSON.stringify(detail)
            : "Unable to fetch weather. Check the city name, API key, and backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const condition = weather?.condition || weather?.description || "Unavailable";

  const getWeatherIcon = (value) => {
    const text = String(value).toLowerCase();

    if (text.includes("rain") || text.includes("drizzle")) return "🌧️";
    if (text.includes("thunder") || text.includes("storm")) return "⛈️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("snow")) return "❄️";
    if (text.includes("clear") || text.includes("sun")) return "☀️";
    if (text.includes("mist") || text.includes("fog") || text.includes("haze")) {
      return "🌫️";
    }

    return "🌤️";
  };

  return (
    <main className="weather-page">
      <header className="weather-heading">
        <span className="weather-eyebrow">SMART FARMING TOOLKIT</span>
        <h1>🌦️ Weather Information</h1>
        <p>
          Check current weather conditions to help you plan
          your farming activities.
        </p>
      </header>

      <section className="weather-card">
        <div className="weather-card-heading">
          <div className="weather-heading-icon">🌍</div>
          <div>
            <h2>Check your local weather</h2>
            <p>Enter a city to retrieve its current weather information.</p>
          </div>
        </div>

        <div className="weather-divider" />

        <form onSubmit={getWeather}>
          <label className="weather-label" htmlFor="weather-city">
            City name
          </label>

          <div className="weather-search">
            <span aria-hidden="true">📍</span>
            <input
              id="weather-city"
              type="text"
              placeholder="Enter city (e.g. Hyderabad)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <p className="weather-hint">
            Use a city name supported by your weather service.
          </p>

          <button
            className="weather-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Fetching current weather..." : "☁️  Get Weather  →"}
          </button>
        </form>

        {error && (
          <div className="weather-error" role="alert">
            {error}
          </div>
        )}

        {weather && (
          <section className="weather-results" aria-live="polite">
            <div className="weather-location">
              <div>
                <span className="weather-result-eyebrow">
                  CURRENT CONDITIONS
                </span>
                <h2>{weather.city || city}</h2>
              </div>
              <div className="weather-condition-icon" aria-hidden="true">
                {getWeatherIcon(condition)}
              </div>
            </div>

            <p className="weather-condition-text">{condition}</p>

            <div className="weather-metrics">
              <div className="weather-metric temperature-metric">
                <span className="weather-metric-icon">🌡️</span>
                <span className="weather-metric-label">Temperature</span>
                <strong>
                  {weather.temperature != null
                    ? `${weather.temperature}°C`
                    : "Unavailable"}
                </strong>
                <small>Degrees Celsius</small>
              </div>

              <div className="weather-metric humidity-metric">
                <span className="weather-metric-icon">💧</span>
                <span className="weather-metric-label">Humidity</span>
                <strong>
                  {weather.humidity != null
                    ? `${weather.humidity}%`
                    : "Unavailable"}
                </strong>
                <small>Relative humidity</small>
              </div>
            </div>

            <div className="weather-advisory">
              <span className="weather-advisory-icon">🌱</span>
              <div>
                <strong>Farming note</strong>
                <p>
                  Use these current conditions alongside your field
                  observations when planning irrigation and other farm work.
                  Check a forecast before making weather-dependent decisions.
                </p>
              </div>
            </div>
          </section>
        )}
      </section>

      <p className="weather-footer">
        Smart Farmer Assistant · Weather-aware farming insights
      </p>
    </main>
  );
}

export default Weather;
