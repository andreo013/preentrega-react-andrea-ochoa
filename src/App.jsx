import { Routes, Route } from "react-router-dom";
import Layout from "./componentes/Layout/Layout";
import Inicio from "./paginas/Inicio";
import ItemListContainer from "./componentes/Productos/ItemListContainer/ItemListContainer";
import ItemDetalle from "./componentes/Productos/ItemDetalle/ItemDetalle";
import Antologias from "./paginas/antologias";
import Cuadernillos from "./paginas/cuadernillos";
import Fechas from "./paginas/fechas";
import Juegos from "./paginas/juegos";
import Contacto from "./paginas/contacto";
import Gestion from "./componentes/Gestion/Gestion";
import Carrito from "./paginas/carrito";
import GestionCupones from "./componentes/GestionCupones/GestionCupones";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Inicio />} />

        <Route
          path="productos"
          element={
            <ItemListContainer mensaje="Nuestros productos" />
          }
        />

        <Route
          path="producto/:id"
          element={<ItemDetalle />}
        />

        <Route
          path="destacados"
          element={
            <div className="contenido">
              <h1>Productos destacados</h1>
              <p>
                Estos son los materiales más elegidos por nuestros clientes.
              </p>
            </div>
          }
        />

        <Route
          path="alta-producto"
          element={<Gestion />}
        />

        <Route path="antologias" element={<Antologias />} />

        <Route path="cuadernillos" element={<Cuadernillos />} />

        <Route path="fechas" element={<Fechas />} />

        <Route path="juegos" element={<Juegos />} />

        <Route path="contacto" element={<Contacto />} />

        <Route path="carrito" element={<Carrito />} />

        <Route
          path="admin/cupones" element={<GestionCupones />}
        />


      </Route>
    </Routes>
  );
}

export default App;
