import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      toast.success("Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo ya está registrado. ¿Querés iniciar sesión?"
        );

        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        console.error("Error en el registro:", error);
        toast.error("No se pudo registrar el usuario. Verificá los datos.");
      }
    }
  };

 return (
  <>
    <Helmet>
      <title>Caja Didáctica | Registro</title>

      <meta
        name="description"
        content="Creá tu cuenta en Caja Didáctica para acceder a materiales educativos y realizar compras."
      />
    </Helmet>

    <div className="contenido">
      <form
        onSubmit={handleRegistro}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "360px",
          margin: "30px auto",
          padding: "1.5rem",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          gap: "12px"
        }}
      >
        <h2>Crear cuenta</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña - mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
        </div>
  </>
  );
}

export default Registro;