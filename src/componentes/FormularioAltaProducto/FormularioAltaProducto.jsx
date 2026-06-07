function FormularioAltaProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading,
  modoEdicion,
  cancelarEdicion,
  preview
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
      <h3>{modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</h3>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginTop: "-5px",
          marginBottom: "10px"
        }}
      >
        {modoEdicion
          ? "Modificá los datos del material seleccionado."
          : "Formulario de carga administrativa. Los datos se muestran como vista previa del nuevo material."}
      </p>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Antología de cuentos"
          value={datosForm.nombre}
          onChange={manejarCambio}
          required
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
          min="1"
          required
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
          min="0"
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
        <label>
          {modoEdicion ? "Cambiar imagen del material:" : "Imagen del material:"}
        </label>

        <input type="file" accept="image/*" onChange={manejarCambioImagen} />

        {modoEdicion && datosForm.imagen && !preview && (
          <div>
            <p>Imagen actual:</p>
            <img
              src={datosForm.imagen}
              alt="Imagen actual"
              style={{ width: "100px", borderRadius: "8px" }}
            />
          </div>
        )}

        {preview && (
          <div>
            <p>Nueva imagen seleccionada:</p>
            <img
              src={preview}
              alt="Vista previa"
              style={{ width: "100px", borderRadius: "8px" }}
            />
          </div>
        )}
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
        {loading
          ? "Guardando..."
          : modoEdicion
          ? "Actualizar Producto"
          : "Guardar Material"}
      </button>

      {modoEdicion && (
        <button
          type="button"
          onClick={cancelarEdicion}
          style={{
            backgroundColor: "#999",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            padding: "10px",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Cancelar Edición
        </button>
      )}
    </form>
  );
}

export default FormularioAltaProducto;