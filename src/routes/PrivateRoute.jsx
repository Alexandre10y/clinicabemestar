import { Navigate } from "react-router-dom";

function PrivateRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("userLogged"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.tipo !== "admin") {
    return <Navigate to="/dashboard" />; // bloqueia profissional
  }

  return children;
}

export default PrivateRoute;
