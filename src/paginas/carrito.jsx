
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

function Carrito() {
  const { carrito, removeItem, restarItem, clearCart, getCartTotal } =
    useContext(CartContext);

  const [codigoCupon, setCodigoCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(null);

  const total = getCartTotal();
  const descuento = cuponAplicado
    ? (total * cuponAplicado.descuento) / 100
    : 0;
  const totalConDescuento = total - descuento;

  const aplicarCupon = async () => {
    if (codigoCupon.trim() === "") {
      toast.warning("Ingresá un código de cupón.");
      return;
    }

    const cuponesRef = collection(db, "cupones");
    const consulta = query(
      cuponesRef,
      where("codigo", "==", codigoCupon.trim().toUpperCase())
    );

    const respuesta = await getDocs(consulta);

    if (respuesta.empty) {
      toast.error("Cupón no válido.");
      setCuponAplicado(null);
      return;
    }

    const cuponEncontrado = respuesta.docs[0].data();

    setCuponAplicado(cuponEncontrado);
    toast.success("Cupón aplicado correctamente.");
  };

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

      <div
        style={{
          maxWidth: "500px",
          margin: "25px auto",
          padding: "15px",
          backgroundColor: "#faf7ff",
          borderRadius: "12px",
          border: "1px solid #e4d8ff"
        }}
      >
        <h3>Cupón de descuento</h3>

        <input
          type="text"
          placeholder="Ingresá tu cupón"
          value={codigoCupon}
          onChange={(e) => setCodigoCupon(e.target.value)}
          disabled={!!cuponAplicado}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d8c7ff",
            marginRight: "10px",
            backgroundColor: cuponAplicado ? "#f1f1f1" : "white"
          }}
        />

        <button
          onClick={aplicarCupon}
          disabled={!!cuponAplicado}
          style={{
            backgroundColor: cuponAplicado ? "#9b7cff" : "#7c4dff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: cuponAplicado ? "not-allowed" : "pointer"
          }}
        >
          {cuponAplicado ? "Cupón aplicado" : "Aplicar"}
        </button>

        {cuponAplicado && (
          <p style={{ marginTop: "12px", color: "#5f2eea", fontWeight: "bold" }}>
            Cupón aplicado: {cuponAplicado.codigo} ({cuponAplicado.descuento}%)
          </p>
        )}
      </div>

      <h3>Subtotal: $ {total} ARS</h3>

      {cuponAplicado && (
        <h3>Descuento: -$ {descuento.toFixed(2)} ARS</h3>
      )}

      <h2>Total a pagar: $ {totalConDescuento.toFixed(2)} ARS</h2>

      <button
        onClick={() => {
          clearCart();
          setCuponAplicado(null);
          setCodigoCupon("");
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
          toast.success("Gracias por su compra!");
          clearCart();
          setCuponAplicado(null);
          setCodigoCupon("");
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