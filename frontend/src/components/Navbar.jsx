
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("userChanged", updateUser);

    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  const navItems = [
    { label: "Home", path: "/", icon: "⌂" },
    { label: "Crop", path: "/crop", icon: "🌱" },
    { label: "Fertilizer", path: "/fertilizer", icon: "🧪" },
    { label: "Yield", path: "/yield", icon: "📊" },
    { label: "Weather", path: "/weather", icon: "☀️" },
    { label: "History", path: "/history", icon: "◷" },
    { label: "Dashboard", path: "/dashboard", icon: "▦" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="app-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌱</span>
          <span>Smart Farmer Assistant</span>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="navbar-account">
          {user && user.user_id ? (
            <>
              <span className="account-avatar">
                {(user.name || "F").charAt(0).toUpperCase()}
              </span>

              <span className="account-name">
                {user.name || "Farmer"}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="navbar-auth" to="/login">
                Login
              </Link>

              <Link className="navbar-register" to="/register">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
