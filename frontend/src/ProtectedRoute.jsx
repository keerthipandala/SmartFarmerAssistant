
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const storedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    user = null;
  }

  // Require a valid user object in local storage
  if (!user || !user.user_id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
