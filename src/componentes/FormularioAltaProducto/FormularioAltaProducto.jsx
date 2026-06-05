function FormularioAltaProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading
}) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "360px",
    margin: "30px auto",
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    gap: "12px"
  };

  return (
    <form style={formStyle} onSubmit={manejarEnvio}>

      <h3>Agregar Nuevo Producto</h3>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginTop: "-5px",
          marginBottom: "10px"
        }}
      >
        Formulario de carga administrativa. Los datos se muestran como vista previa del nuevo material.
      </p>


      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Antología de cuentos"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          placeholder="Ej: 4500"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          placeholder="Ej: 10"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>Categoría:</label>
        <select
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        >
          <option value="">Seleccionar categoría</option>
          <option value="antologias">Antologías</option>
          <option value="cuadernillos">Cuadernillos</option>
          <option value="fechas">Fechas Especiales</option>
          <option value="juegos">Juegos</option>
        </select>
      </div>

      <div>
        <label>Detalle:</label>
        <textarea
          name="detalle"
          placeholder="Descripción breve del material"
          value={datosForm.detalle}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>Imagen del material:</label>
        <input
          type="file"
          accept="image/*"
          onChange={manejarCambioImagen}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? "#bdbdbd" : "#6c63ff",
          color: loading ? "#333" : "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "14px",
          padding: "10px",
          border: "none",
          borderRadius: "6px"
        }}
      >
        {loading ? "Subiendo imagen, espera un momento..." : "Guardar Material"}
      </button>
    </form>
  );
}

export default FormularioAltaProducto;