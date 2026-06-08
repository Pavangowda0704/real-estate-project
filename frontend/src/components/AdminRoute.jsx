import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;