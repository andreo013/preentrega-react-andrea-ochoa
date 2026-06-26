import ItemListContainer from "../componentes/Productos/ItemListContainer/ItemListContainer";
import { Helmet } from "react-helmet-async";

function Antologias() {
  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Antologías</title>
        <meta
          name="description"
          content="Antologías literarias y materiales didácticos para trabajar la lectura en el aula."
        />
      </Helmet>

      <div className="contenido">
        <h1>ANTOLOGÍAS</h1>

        <ItemListContainer categoria="antologias" />
      </div>
    </>
  );
}

export default Antologias;