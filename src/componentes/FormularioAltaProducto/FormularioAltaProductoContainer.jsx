import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioAltaProducto from "./FormularioAltaProducto";

function FormularioAltaProductoContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    detalle: ""
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productoGuardado, setProductoGuardado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setDatosForm({
      ...datosForm,
      [name]: value
    });
  };

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    setImagenFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    alert("Entró al submit");




    if (!imagenFile) {
      setMensaje("⚠️ Seleccioná una imagen");
      setTimeout(() => setMensaje(""), 3000);
      return;
    }

    setLoading(true);

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      const respuesta = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await respuesta.json();

      if (!respuesta.ok || !data.success) {
        throw new Error("Error al subir imagen");
      }

      const productoCompleto = {
        nombre: datosForm.nombre,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        categoria: datosForm.categoria,
        detalle: datosForm.detalle,
        imagen: data.data.url,
        destacado: false,
        oferta: false
      };

      const productosCollection = collection(db, "productos");

      const docRef = await addDoc(productosCollection, productoCompleto);





      const productoConId = {
        id: docRef.id,
        ...productoCompleto
      };

      setProductoGuardado(productoConId);

      setDatosForm({
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        detalle: ""
      });

      setImagenFile(null);
      setPreview(null);

      setMensaje("Material guardado correctamente en Firebase ✔");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al guardar el producto");
      setTimeout(() => setMensaje(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {mensaje && <div className="toast">{mensaje}</div>}

      <FormularioAltaProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        loading={loading}
      />

      {productoGuardado && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="card-producto"
            style={{
              width: "320px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "12px",
              textAlign: "center",
              marginTop: "15px"
            }}
          >
            <img
              src={productoGuardado.imagen}
              alt={productoGuardado.nombre}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "contain",
                borderRadius: "10px"
              }}
            />

            <h3>{productoGuardado.nombre}</h3>
            <p><strong>${productoGuardado.precio}</strong></p>
            <p>Stock: {productoGuardado.stock}</p>
            <p>Categoría: {productoGuardado.categoria}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default FormularioAltaProductoContainer;