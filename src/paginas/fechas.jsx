import ItemListContainer from "../componentes/Productos/ItemListContainer/ItemListContainer";
import { Helmet } from "react-helmet-async";

function Fechas() {
  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Fechas Especiales</title>
        <meta
          name="description"
          content="Materiales didácticos para trabajar efemérides y fechas especiales en todos los niveles educativos."
        />
      </Helmet>

      <div className="contenido">
        <h1>FECHAS ESPECIALES</h1>

        <ItemListContainer categoria="fechas" />
      </div>
    </>
  );
}

export default Fechas;