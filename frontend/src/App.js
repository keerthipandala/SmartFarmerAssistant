
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

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<Weather />} />

        {/* Protected pages: login required */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/yield" element={<Yield />} />
          <Route path="/history" element={<History />} />
        </Route>

        {/* Unknown URLs return to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
