import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError("Login failed");
        return;
      }

      if (data.message === "Invalid email or password") {
        setError("Invalid email or password");
        return;
      }

      setMessage("Login successful!");

      // Save user information
      localStorage.setItem(
        "user_id",
        data.user_id
      );

      localStorage.setItem(
        "name",
        data.name
      );

      localStorage.setItem(
        "email",
        data.email
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error(err);
      setError("Cannot connect to the backend.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>🌾 Welcome Back</h1>

        <p>
          Login to Smart Farmer Assistant
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default Login;