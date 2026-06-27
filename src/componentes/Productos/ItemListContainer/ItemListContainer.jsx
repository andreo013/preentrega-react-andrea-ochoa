import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function ItemListContainer({ mensaje, categoria, destacados, oferta }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productosCollection = collection(db, "productos");

    getDocs(productosCollection)
      .then((resp) => {
        let productosFirebase = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        if (categoria) {
          productosFirebase = productosFirebase.filter(
            (producto) => producto.categoria === categoria
          );
        }

        if (destacados) {
          productosFirebase = productosFirebase.filter(
            (producto) => producto.destacado === true
          );
        }

        productosFirebase.sort((a, b) => {
          const numA = parseInt(a.nombre?.match(/\d+/)?.[0] || 0);
          const numB = parseInt(b.nombre?.match(/\d+/)?.[0] || 0);

          return numA - numB;
        });

        setProductos(productosFirebase);
      })
      .catch((error) => {
        console.error("Error al traer productos desde Firebase:", error);
        toast.error("Error al cargar los productos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoria, destacados]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      {mensaje && (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          {mensaje}
        </h2>
      )}

      <ItemList productos={productos} oferta={oferta} />
    </div>
  );
}

export default ItemListContainer;