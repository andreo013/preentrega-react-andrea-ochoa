import { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioAltaProducto from "./FormularioAltaProducto";

const estadoInicialForm = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  detalle: "",
  imagen: ""
};

function FormularioAltaProductoContainer({
  productoAEditar,
  cancelarEdicion,
  actualizarListado
}) {
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productoGuardado, setProductoGuardado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm({
        nombre: productoAEditar.nombre || "",
        precio: productoAEditar.precio || "",
        stock: productoAEditar.stock || "",
        categoria: productoAEditar.categoria || "",
        detalle: productoAEditar.detalle || "",
        imagen: productoAEditar.imagen || ""
      });

      setPreview(null);
      setImagenFile(null);
      setProductoGuardado(null);
    } else {
      setDatosForm(estadoInicialForm);
    }
  }, [productoAEditar]);

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

  const validarFormulario = () => {
    if (datosForm.nombre.trim() === "") {
      alert("El nombre del producto no puede estar vacío.");
      return false;
    }

    if (Number(datosForm.precio) <= 0 || isNaN(Number(datosForm.precio))) {
      alert("El precio debe ser un número mayor que cero.");
      return false;
    }

    return true;
  };

  const subirImagen = async () => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", imagenFile);

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

    return data.data.url;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    if (!productoAEditar && !imagenFile) {
      setMensaje("⚠️ Seleccioná una imagen");
      setTimeout(() => setMensaje(""), 3000);
      return;
    }

    setLoading(true);

    try {
      let urlImagen = datosForm.imagen;

      if (imagenFile) {
        urlImagen = await subirImagen();
      }

      const productoCompleto = {
        nombre: datosForm.nombre,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        categoria: datosForm.categoria,
        detalle: datosForm.detalle,
        imagen: urlImagen,
        destacado: productoAEditar?.destacado || false,
        oferta: productoAEditar?.oferta || false
      };

      if (productoAEditar) {
        const docRef = doc(db, "productos", productoAEditar.id);

        await updateDoc(docRef, productoCompleto);

        setMensaje("Producto actualizado correctamente ✔");
      } else {
        const productosCollection = collection(db, "productos");

        const docRef = await addDoc(productosCollection, productoCompleto);

        const productoConId = {
          id: docRef.id,
          ...productoCompleto
        };

        setProductoGuardado(productoConId);

        setMensaje("Material guardado correctamente en Firebase ✔");
      }

      setDatosForm(estadoInicialForm);
      setImagenFile(null);
      setPreview(null);

      if (actualizarListado) {
        actualizarListado();
      }

      if (productoAEditar && cancelarEdicion) {
        cancelarEdicion();
      }

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
        modoEdicion={!!productoAEditar}
        cancelarEdicion={cancelarEdicion}
        preview={preview}
      />

      {productoGuardado && !productoAEditar && (
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
            <p>
              <strong>${productoGuardado.precio}</strong>
            </p>
            <p>Stock: {productoGuardado.stock}</p>
            <p>Categoría: {productoGuardado.categoria}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default FormularioAltaProductoContainer;