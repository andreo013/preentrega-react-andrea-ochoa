import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

function Item({ producto, oferta }) {
  const { id, nombre, precio, stock, imagen } = producto;

  const [cantidad, setCantidad] = useState(0);
  const { addToCart } = useContext(CartContext);

const agregarAlCarrito = () => {
  if (cantidad > 0) {
    addToCart(producto, cantidad);
    setCantidad(0);
  }
};

  return (
    <div
      className="card-producto"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "220px",
        textAlign: "center",
        background: "white"
      }}
    >
      <img
        src={imagen}
        alt={nombre}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <h3>{nombre}</h3>

      {oferta ? (
        <p className="precio-sale">
          <span className="fuego">🔥</span> $ {precio}
        </p>
      ) : (
        <p>$ {precio}</p>
      )}

      <p>Stock: {stock}</p>

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
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    } else {
      alert("No hay más stock disponible");
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
          borderRadius: "6px",
          padding: "8px 10px",
          cursor: "pointer",
          marginBottom: "10px"
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