import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    alert("Sesión cerrada");
    navigate("/");
  };

  return (
    <div className="contenido">
      <div
        style={{
          maxWidth: "420px",
          margin: "30px auto",
          padding: "1.5rem",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h1>Mi Perfil</h1>

        <p>¡Hola de nuevo, {user.email}!</p>

        <p>Rol: {user.rol}</p>

        <button onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Perfil;