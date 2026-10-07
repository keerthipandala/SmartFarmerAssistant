import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Crop from "./pages/Crop";
import Fertilizer from "./pages/Fertilizer";
import Yield from "./pages/Yield";
import History from "./pages/History";
import Weather from "./pages/Weather";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Crop Page */}
        <Route
          path="/crop"
          element={<Crop />}
        />

        {/* Fertilizer Page */}
        <Route
          path="/fertilizer"
          element={<Fertilizer />}
        />
        
        {/* Yield Page */}
        <Route
          path="/yield"
          element={<Yield />}
        />

        {/* History Page */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* Weather Page */}
        <Route
          path="/weather"
          element={<Weather />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;