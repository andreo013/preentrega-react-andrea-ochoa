import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="contenido">
      <form
        onSubmit={handleLogin}
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
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>

        <p>
          ¿No tenés cuenta? <Link to="/registro">Registrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;