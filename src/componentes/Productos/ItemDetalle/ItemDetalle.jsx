import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { Spinner } from "react-bootstrap";

function ItemDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const productoRef = doc(db, "productos", id);

    getDoc(productoRef)
      .then((resp) => {
        if (resp.exists()) {
          setProducto({
            id: resp.id,
            ...resp.data()
          });
        } else {
          setProducto(false);
        }
      })
      .catch((error) => {
        console.log("Error al cargar producto:", error);
      });
  }, [id]);

  if (producto === null) {
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

  if (producto === false) {
    return <p>Producto no encontrado.</p>;
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

      <div
        style={{
          textAlign: "center"
        }}
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            width: "300px",
            maxWidth: "90%",
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
    </div>
  );
}

export default ItemDetalle;