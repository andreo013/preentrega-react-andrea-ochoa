import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

function ItemListContainer({ mensaje, categoria, destacados, oferta }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
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

        console.table(productosFirebase.map((p) => ({
          nombre: p.nombre,
          categoria: p.categoria,
          imagen: p.imagen
        })));

        setProductos(productosFirebase);
      })
      .catch((error) => {
        console.error("Error al traer productos desde Firebase:", error);
      });
  }, [categoria, destacados]);

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