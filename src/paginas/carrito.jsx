import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Carrito() {
const { carrito, removeFromCart } = useContext(CartContext);

  return (
    <div className="contenido">
      <h1>Carrito de compras</h1>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        carrito.map((producto) => (
          <div
            key={producto.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              margin: "15px auto",
              maxWidth: "500px",
              background: "white"
            }}
          >
            <h3>{producto.nombre}</h3>
            <p>Cantidad: {producto.cantidad}</p>
            <p>Precio: $ {producto.precio} ARS</p>
            <p>
              Subtotal: $ {producto.precio * producto.cantidad} ARS
            </p>

            <button
  onClick={() => removeFromCart(producto.id)}
  style={{
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  Eliminar
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Carrito;