import ItemListContainer from "../componentes/Productos/ItemListContainer/ItemListContainer";
import { Helmet } from "react-helmet-async";

function Juegos() {
  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Juegos Didácticos</title>
        <meta
          name="description"
          content="Juegos didácticos para aprender de forma creativa, divertida y participativa."
        />
      </Helmet>

      <div className="contenido">
        <h1>JUEGOS</h1>

        <ItemListContainer categoria="juegos" />
      </div>
    </>
  );
}

export default Juegos;