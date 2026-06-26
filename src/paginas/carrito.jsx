import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function Carrito() {
  const {
    carrito,
    removeItem,
    restarItem,
    clearCart,
    getCartTotal
  } = useContext(CartContext);

  if (carrito.length === 0) {
    return (
      <div className="contenido">
        <h1>Carrito de compras</h1>
        <p>No hay productos en el carrito.</p>

        <Link to="/" className="btn-volver">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="contenido">
      <h1>Carrito de compras</h1>

      {carrito.map((producto) => (
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
          <p>Subtotal: $ {producto.precio * producto.cantidad} ARS</p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <button
              onClick={() => restarItem(producto.id)}
              style={{
                backgroundColor: "#ffa726",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                cursor: "pointer"
              }}
            >
              Quitar 1
            </button>

            <button
              onClick={() => {
  removeItem(producto.id);
  toast.success("Producto eliminado del carrito.");
}}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                cursor: "pointer"
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <h2>Total a pagar: $ {getCartTotal()} ARS</h2>

      <button
        onClick={() => {
  clearCart();
  toast.success("Carrito vaciado.");
}}
        style={{
          backgroundColor: "#444",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 14px",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Vaciar carrito
      </button>

      <Link
        to="/"
        onClick={() => {
          toast.success("¡Gracias por comprar!");
          clearCart();
        }}
        style={{
          backgroundColor: "#7c4dff",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          padding: "10px 14px"
        }}
      >
        Finalizar compra
      </Link>
    </div>
  );
}

export default Carrito;