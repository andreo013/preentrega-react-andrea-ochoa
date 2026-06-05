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

  const getCantidadActual = (productId) => {
    const item = carrito.find((item) => item.id === productId);
    return item ? item.cantidad : 0;
  };

  const removeItem = (productId) => {
    const carritoActualizado = carrito.filter(
      (item) => item.id !== productId
    );

    setCarrito(carritoActualizado);
  };

  const restarItem = (productId) => {
    const itemEncontrado = carrito.find(
      (item) => item.id === productId
    );

    if (itemEncontrado.cantidad > 1) {
      const carritoActualizado = carrito.map((item) =>
        item.id === productId
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );

      setCarrito(carritoActualizado);
    } else {
      removeItem(productId);
    }
  };

  const isInCart = (productId) => {
    return carrito.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const getCartTotal = () => {
    return carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  };

  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        getCantidadActual,
        removeItem,
        restarItem,
        isInCart,
        clearCart,
        getCartTotal,
        cantidadTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;