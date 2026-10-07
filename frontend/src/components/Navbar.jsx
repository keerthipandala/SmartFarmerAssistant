import { Link } from "react-router-dom";

function Navbar() {

  const name = localStorage.getItem("name");

  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";

  };

  return (

    <nav>

      <h2>🌾 Smart Farmer Assistant</h2>

      <Link to="/">Home</Link>
      <Link to="/crop">Crop</Link>
      <Link to="/fertilizer">Fertilizer</Link>
      <Link to="/yield">Yield</Link>
      <Link to="/weather">Weather</Link>
      <Link to="/history">History</Link>
      <Link to="/dashboard">Dashboard</Link>

      {!name ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span
            style={{
              marginLeft: "20px",
              marginRight: "10px"
            }}
          >
            👤 {name}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </>
      )}

    </nav>

  );
}

export default Navbar;