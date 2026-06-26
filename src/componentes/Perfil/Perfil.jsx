import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return (
  <>
    <Helmet>
      <title>Caja Didáctica | Mi Perfil</title>

      <meta
        name="description"
        content="Consultá la información de tu cuenta en Caja Didáctica."
      />
    </Helmet>
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
  </>
  );
}

export default Perfil;