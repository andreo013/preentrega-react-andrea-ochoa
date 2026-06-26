import ItemListContainer from "../componentes/Productos/ItemListContainer/ItemListContainer";
import { Helmet } from "react-helmet-async";



function Cuadernillos() {
  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Cuadernillos</title>
        <meta
          name="description"
          content="Cuadernillos educativos listos para imprimir y utilizar en el aula."
        />
      </Helmet>

      <div className="contenido">
        <h1>CUADERNILLOS</h1>

        <ItemListContainer categoria="cuadernillos" />
      </div>
    </>
  );
}

export default Cuadernillos;

