import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

function ItemDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const productoEncontrado = datos.find(
          (prod) => prod.id === Number(id)
        );

        setProducto(productoEncontrado);
      })
      .catch((error) => console.log("Error al cargar producto:", error));
  }, [id]);

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  const agregarAlCarrito = () => {
    addToCart(producto, 1);
  };


  const rutasCategorias = {
  antologias: "/antologias",
  cuadernillos: "/cuadernillos",
  fechas: "/fechas",
  juegos: "/juegos"
};

const nombresCategorias = {
  antologias: "Antologías",
  cuadernillos: "Cuadernillos",
  fechas: "Fechas Especiales",
  juegos: "Juegos"
};

const rutaVolver = rutasCategorias[producto.categoria] || "/";
const nombreVolver = nombresCategorias[producto.categoria] || "Inicio";




  return (
    <div className="contenido">
      <Link
  to={rutaVolver}
  style={{
    display: "inline-block",
    marginBottom: "20px",
    textDecoration: "none",
    color: "#7c4dff",
    fontWeight: "bold"
  }}
>
  ← Volver a {nombreVolver}
</Link>

      <h1>{producto.nombre}</h1>

      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{
          width: "300px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      />

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "10px"
        }}
      >
        $ {producto.precio} ARS
      </p>

      <p style={{ marginBottom: "15px" }}>
        {producto.detalle}
      </p>

      <button
        onClick={agregarAlCarrito}
        style={{
          backgroundColor: "#7c4dff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 14px",
          cursor: "pointer"
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemDetalle;