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
import Login from "./componentes/Login/Login";
import Registro from "./componentes/Registro/Registro";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import Perfil from "./componentes/Perfil/Perfil";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />

        <Route
          path="productos"
          element={<ItemListContainer mensaje="Nuestros productos" />}
        />

        <Route path="producto/:id" element={<ItemDetalle />} />

        <Route
          path="destacados"
          element={
            <div className="contenido">
              <h1>Productos destacados</h1>
              <p>Estos son los materiales más elegidos por nuestros clientes.</p>
            </div>
          }
        />

        <Route
          path="alta-producto"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Gestion />
            </ProtectedRoute>
          }
        />

        <Route path="antologias" element={<Antologias />} />

        <Route path="cuadernillos" element={<Cuadernillos />} />

        <Route path="fechas" element={<Fechas />} />

        <Route path="juegos" element={<Juegos />} />

        <Route path="contacto" element={<Contacto />} />

        <Route path="carrito" element={<Carrito />} />

        <Route path="login" element={<Login />} />

        <Route path="registro" element={<Registro />} />

        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/cupones"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionCupones />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
