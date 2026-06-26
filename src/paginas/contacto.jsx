import FormularioProducto from "../componentes/Formulario/FormularioProducto";
import { Helmet } from "react-helmet-async";

function Contacto() {
  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Contacto</title>

        <meta
          name="description"
          content="Contactate con Caja Didáctica para consultas sobre materiales educativos, cuadernillos, juegos y antologías."
        />
      </Helmet>

      <div className="contenido">
        <h1>CONTACTO</h1>

        <p>
          Consultas y pedidos personalizados para docentes.
        </p>

        <FormularioProducto />
      </div>
    </>
  );
}

export default Contacto;