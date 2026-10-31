import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const features = [
    {
      icon: "🌱",
      title: "Crop Recommendation",
      description:
        "Discover suitable crops based on soil nutrients and environmental conditions.",
      path: "/crop",
      action: "Recommend a crop",
    },
    {
      icon: "🧪",
      title: "Fertilizer Recommendation",
      description:
        "Find a suitable fertilizer using soil properties, nutrients, and crop information.",
      path: "/fertilizer",
      action: "Find fertilizer",
    },
    {
      icon: "📊",
      title: "Yield Prediction",
      description:
        "Estimate crop yield using agricultural data and machine learning.",
      path: "/yield",
      action: "Predict yield",
    },
    {
      icon: "🌦️",
      title: "Weather Information",
      description:
        "Check current weather conditions to support informed farming decisions.",
      path: "/weather",
      action: "Check weather",
    },
    {
      icon: "📈",
      title: "Prediction History",
      description:
        "Review your previous crop, fertilizer, and yield predictions in one place.",
      path: "/history",
      action: "View history",
    },
    {
      icon: "🤖",
      title: "Farmer Dashboard",
      description:
        "Track your predictions and explore your farming activity from one dashboard.",
      path: "/dashboard",
      action: "Open dashboard",
    },
  ];

  const isLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <main className="home">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">
            🌿 SMART TECHNOLOGY · BETTER FARMING
          </span>

          <h1>
            Grow smarter.
            <br />
            <span>Farm better.</span>
          </h1>

          <p className="hero-description">
            Make informed farming decisions with AI-powered crop
            recommendations, fertilizer suggestions, yield predictions,
            and real-time weather information.
          </p>

          <div className="hero-buttons">
            <Link to={isLoggedIn ? "/crop" : "/login"} className="btn btn-primary">
              Explore Predictions <span aria-hidden="true">→</span>
            </Link>

            <Link
              to={isLoggedIn ? "/dashboard" : "/register"}
              className="btn btn-secondary"
            >
              {isLoggedIn ? "View Dashboard" : "Get Started"}
            </Link>
          </div>

          <div className="hero-trust">
            <span>✓ Data-driven insights</span>
            <span>✓ Easy-to-use tools</span>
            <span>✓ All your predictions in one place</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Smart farming illustration">
          <div className="visual-decoration decoration-one">✳</div>
          <div className="visual-decoration decoration-two">✦</div>

          <div className="farm-illustration">
            <div className="sun"></div>
            <div className="hill hill-back"></div>
            <div className="hill hill-front"></div>

            <div className="farm-field">
              <div className="crop-row crop-row-one">🌱　🌱　🌱　🌱</div>
              <div className="crop-row crop-row-two">🌿　🌿　🌿　🌿</div>
              <div className="crop-row crop-row-three">🌱　🌱　🌱　🌱</div>
            </div>

            <div className="farm-message">
              <span className="message-icon">🌾</span>
              <div>
                <strong>Smarter farming starts here</strong>
                <p>Insights for better decisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="benefits">
        <div className="benefit-item">
          <span className="benefit-icon">🌱</span>
          <div>
            <strong>Crop insights</strong>
            <p>Choose suitable crops</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">🧪</span>
          <div>
            <strong>Soil & nutrients</strong>
            <p>Make informed choices</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">🌤️</span>
          <div>
            <strong>Weather updates</strong>
            <p>Check local conditions</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">📊</span>
          <div>
            <strong>Prediction tracking</strong>
            <p>Review saved results</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-heading">
          <span className="section-eyebrow">YOUR FARMING TOOLKIT</span>
          <h2>Everything you need to farm smarter</h2>
          <p>
            Explore simple tools designed to support better agricultural
            decisions.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <Link
              to={feature.path}
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-card-top">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <span className="feature-action">
                {feature.action} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="home-cta">
        <div>
          <span className="cta-eyebrow">A BETTER WAY TO PLAN</span>
          <h2>Your next farming decision starts here.</h2>
          <p>
            Explore your farming tools and turn agricultural data into useful
            insights.
          </p>
        </div>

        <Link to={isLoggedIn ? "/crop" : "/register"} className="btn cta-button">
          {isLoggedIn ? "Start a Prediction" : "Create Your Account"} →
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <Link to="/" className="footer-brand">
          🌱 Smart Farmer Assistant
        </Link>
        <p>Using technology to support smarter agricultural decisions.</p>
        <span>Smart Farmer Assistant · 2026</span>
      </footer>
    </main>
  );
}

export default Home;