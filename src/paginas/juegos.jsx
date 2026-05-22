import ItemListContainer from "../componentes/Productos/ItemListContainer/ItemListContainer";

function Juegos() {
  return (
    <div className="contenido">
      <h1>JUEGOS</h1>

      <ItemListContainer categoria="juegos" />
    </div>
  );
}

export default Juegos;