import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioAltaProductoContainer from "../FormularioAltaProducto/FormularioAltaProductoContainer";

function Gestion() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);

      const productosFirebase = resp.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      productosFirebase.sort((a, b) => {
        const numA = parseInt(a.nombre?.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.nombre?.match(/\d+/)?.[0] || 0);

        return numA - numB;
      });

      setProductos(productosFirebase);
    };

    obtenerProductos();
  }, []);

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás segura de que querés eliminar este producto?"
    );

    if (confirmacion) {
      const docRef = doc(db, "productos", id);

      await deleteDoc(docRef);

      setProductos(productos.filter((prod) => prod.id !== id));

      alert("Producto eliminado.");
    }
  };

  return (
    <div className="contenido">
      <h1>Gestión de productos</h1>

      <FormularioAltaProductoContainer />

      <hr />

      <h2>Lista de productos</h2>

      <ul>
        {productos.map((prod) => (
          <li key={prod.id} style={{ marginBottom: "8px" }}>
            {prod.nombre} - ${prod.precio}

            <button
              onClick={() => handleDelete(prod.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "5px 8px",
                cursor: "pointer"
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gestion;