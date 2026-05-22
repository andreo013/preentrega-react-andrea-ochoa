function FormularioProducto() {
  return (
    <form
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
      <h2 style={{ marginBottom: "10px" }}>
        Enviá tu consulta
      </h2>

      <input
        type="text"
        placeholder="Nombre"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <input
        type="email"
        placeholder="Email"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <textarea
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
          type="reset"
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