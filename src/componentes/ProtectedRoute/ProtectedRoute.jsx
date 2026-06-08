import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, rolesPermitidos }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="contenido">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;