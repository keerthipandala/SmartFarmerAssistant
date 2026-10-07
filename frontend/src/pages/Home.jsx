import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <h1>🌾 Smart Farmer Assistant</h1>

        <p>
          Get intelligent farming insights using
          Artificial Intelligence and Machine Learning.
          Make better decisions for your crops,
          fertilizers and yield.
        </p>

        <div className="hero-buttons">

          <Link to="/crop" className="btn btn-primary">
            Start Prediction
          </Link>

          <Link to="/dashboard" className="btn btn-secondary">
            View Dashboard
          </Link>

        </div>

      </section>


      {/* Features Section */}
      <section className="features">

        <h2>Our Smart Farming Features</h2>

        <div className="feature-grid">

          {/* Crop */}
          <div className="feature-card">

            <div className="feature-icon">
              🌱
            </div>

            <h3>Crop Recommendation</h3>

            <p>
              Get suitable crop recommendations
              based on soil and environmental
              conditions.
            </p>

          </div>


          {/* Fertilizer */}
          <div className="feature-card">

            <div className="feature-icon">
              🧪
            </div>

            <h3>Fertilizer Recommendation</h3>

            <p>
              Get fertilizer recommendations
              based on soil nutrients and crop
              information.
            </p>

          </div>


          {/* Yield */}
          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>Yield Prediction</h3>

            <p>
              Predict expected crop yield using
              historical agricultural data and
              machine learning.
            </p>

          </div>


          {/* Weather */}
          <div className="feature-card">

            <div className="feature-icon">
              🌦️
            </div>

            <h3>Weather Information</h3>

            <p>
              Check current weather information
              to support better farming decisions.
            </p>

          </div>


          {/* History */}
          <div className="feature-card">

            <div className="feature-icon">
              📈
            </div>

            <h3>Prediction History</h3>

            <p>
              View your previous crop, fertilizer
              and yield predictions in one place.
            </p>

          </div>


          {/* AI */}
          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>AI Powered</h3>

            <p>
              Uses machine learning models to
              provide data-driven farming insights.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;