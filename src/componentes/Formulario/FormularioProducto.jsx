import { useState } from "react";
import { toast } from "react-toastify";

function FormularioProducto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    consulta: ""
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (
      formulario.nombre.trim() === "" ||
      formulario.email.trim() === "" ||
      formulario.consulta.trim() === ""
    ) {
      toast.error("Completá todos los campos.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email);

    if (!emailValido) {
      toast.error("Ingresá un email válido.");
      return;
    }

    toast.success("Consulta enviada correctamente.");

    setFormulario({
      nombre: "",
      email: "",
      consulta: ""
    });
  };

  const borrarFormulario = () => {
    setFormulario({
      nombre: "",
      email: "",
      consulta: ""
    });
  };

  return (
    <form
      onSubmit={manejarEnvio}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        margin: "30px auto",
        padding: "2rem",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        gap: "14px"
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Enviá tu consulta</h2>

      <input
        type="text"
        name="nombre"
        value={formulario.nombre}
        onChange={manejarCambio}
        placeholder="Nombre"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <input
        type="email"
        name="email"
        value={formulario.email}
        onChange={manejarCambio}
        placeholder="Email"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <textarea
        name="consulta"
        value={formulario.consulta}
        onChange={manejarCambio}
        placeholder="Escribí tu consulta..."
        rows="5"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "none"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px"
        }}
      >
        <button
          type="submit"
          style={{
            flex: 1,
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Enviar
        </button>

        <button
          type="button"
          onClick={borrarFormulario}
          style={{
            flex: 1,
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Borrar
        </button>
      </div>
    </form>
  );
}

export default FormularioProducto;