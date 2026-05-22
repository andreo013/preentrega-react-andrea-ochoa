import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto, cantidad = 1) => {
    const productoExistente = carrito.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );

      setCarrito(carritoActualizado);
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad
        }
      ]);
    }
  };

  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

const removeFromCart = (id) => {
  const carritoActualizado = carrito.filter(
    (item) => item.id !== id
  );

  setCarrito(carritoActualizado);
};




  return (
    <CartContext.Provider
      value={{
  carrito,
  addToCart,
  removeFromCart,
  cantidadTotal
}}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;