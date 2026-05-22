import Item from "../Item/Item";

function ItemList({ productos, oferta }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      {productos.map((producto) => (
        <Item
          key={producto.id}
          producto={producto}
          oferta={oferta}
        />
      ))}
    </div>
  );
}

export default ItemList;