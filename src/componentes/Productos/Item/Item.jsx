import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { toast } from "react-toastify";
import styles from "./Item.module.css";

function Item({ producto, oferta }) {
  const { id, nombre, precio, stock, imagen } = producto;

  const [cantidad, setCantidad] = useState(0);
  const { addToCart, getCantidadActual } = useContext(CartContext);

  const cantidadActual = getCantidadActual(id);

  const agregarAlCarrito = () => {
    if (cantidad > 0) {
      addToCart(producto, cantidad);
      setCantidad(0);
    }
  };

  return (
    <div
      className={styles.cardProducto}
      style={{
        border: "1px solid #e4d8ff",
        borderRadius: "14px",
        padding: "12px",
        width: "220px",
        textAlign: "center",
        background: "#faf7ff",
        boxShadow: "0 3px 10px rgba(124, 77, 255, 0.12)"
      }}
    >
      <img
        src={imagen}
        alt={nombre}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "contain",
          borderRadius: "8px",
          backgroundColor: "white"
        }}
      />

      <h3
        style={{
          minHeight: "42px",
          lineHeight: "1.2",
          margin: "10px 0 8px"
        }}
      >
        {nombre}
      </h3>

      {oferta ? (
        <p className="precio-sale">
          <span className="fuego">🔥</span> $ {precio}
        </p>
      ) : (
        <p>$ {precio}</p>
      )}

      <p>Stock: {stock}</p>

      {cantidadActual > 0 && (
        <p style={{ color: "#7c4dff", fontWeight: "bold" }}>
          En carrito: {cantidadActual}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "10px"
        }}
      >
        <button onClick={() => setCantidad(cantidad > 0 ? cantidad - 1 : 0)}>
          -
        </button>

        <span>{cantidad}</span>

        <button
          onClick={() => {
            if (cantidad + cantidadActual < stock) {
              setCantidad(cantidad + 1);
            } else {
              toast.warning("No hay más stock disponible");
            }
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={agregarAlCarrito}
        style={{
          backgroundColor: "#7c4dff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "7px 10px",
          cursor: "pointer",
          marginBottom: "12px",
          fontSize: "0.95rem"
        }}
      >
        Agregar al carrito
      </button>

      <br />

      <Link to={`/producto/${id}`}>Ver detalle</Link>
    </div>
  );
}

export default Item;