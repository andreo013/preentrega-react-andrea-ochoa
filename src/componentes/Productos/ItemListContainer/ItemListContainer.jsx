import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";

function ItemListContainer({ mensaje, categoria, destacados, oferta }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => {
        let productosFiltrados = data;

        if (categoria) {
          productosFiltrados = productosFiltrados.filter(
            (producto) => producto.categoria === categoria
          );
        }

        if (destacados) {
          productosFiltrados = productosFiltrados.filter(
            (producto) => producto.destacado === true
          );
        }

        setProductos(productosFiltrados);
      });
  }, [categoria, destacados]);

  return (
    <div>
      {mensaje && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          {mensaje}
        </h2>
      )}

      <ItemList productos={productos} oferta={oferta} />
    </div>
  );
}

export default ItemListContainer;