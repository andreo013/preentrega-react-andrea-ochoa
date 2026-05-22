import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function CartWidget() {
  const { cantidadTotal } = useContext(CartContext);

  return (
    <Link
      to="/carrito"
      style={{
        textDecoration: "none",
        color: "#7c4dff",
        fontWeight: "bold"
      }}
    >
      🛒 Ver carrito ({cantidadTotal})
    </Link>
  );
}

export default CartWidget;