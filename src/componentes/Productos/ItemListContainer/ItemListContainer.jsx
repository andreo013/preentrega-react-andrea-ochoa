import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function ItemListContainer({ mensaje, categoria, destacados, oferta }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 10;

  const normalizarTexto = (texto) =>
    texto
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    setLoading(true);

    const productosCollection = collection(db, "productos");

    getDocs(productosCollection)
      .then((resp) => {
        let productosFirebase = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        if (categoria) {
          productosFirebase = productosFirebase.filter(
            (producto) => producto.categoria === categoria
          );
        }

        if (destacados) {
          productosFirebase = productosFirebase.filter(
            (producto) => producto.destacado === true
          );
        }

        productosFirebase.sort((a, b) =>
          a.nombre.localeCompare(b.nombre, "es", {
            sensitivity: "base"
          })
        );

        setProductos(productosFirebase);
      })
      .catch((error) => {
        console.error("Error al traer productos desde Firebase:", error);
        toast.error("Error al cargar los productos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoria, destacados]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, categoria]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  const busquedaLimpia = normalizarTexto(busqueda.trim());

  const productosFiltrados =
    busquedaLimpia === ""
      ? productos
      : productos.filter((producto) =>
          normalizarTexto(producto.nombre || "").includes(busquedaLimpia)
        );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const indiceFinal = indiceInicial + productosPorPagina;

  const productosPaginados = productosFiltrados.slice(
    indiceInicial,
    indiceFinal
  );

  const cambiarPagina = (numeroPagina) => {
  setPaginaActual(numeroPagina);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const Paginador = () => {
    if (totalPaginas <= 1) return null;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          margin: "25px 0",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          style={{
            padding: "7px 12px",
            borderRadius: "8px",
            border: "1px solid #d8c7ff",
            cursor: paginaActual === 1 ? "not-allowed" : "pointer"
          }}
        >
          Anterior
        </button>

        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => cambiarPagina(index + 1)}
            style={{
              padding: "7px 12px",
              borderRadius: "8px",
              border: "1px solid #d8c7ff",
              cursor: "pointer",
              backgroundColor: paginaActual === index + 1 ? "#7c4dff" : "white",
              color: paginaActual === index + 1 ? "white" : "#7c4dff"
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          style={{
            padding: "7px 12px",
            borderRadius: "8px",
            border: "1px solid #d8c7ff",
            cursor: paginaActual === totalPaginas ? "not-allowed" : "pointer"
          }}
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div>
      {mensaje && (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>{mensaje}</h2>
      )}

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="🔍 Buscar material..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "90%",
            maxWidth: "420px",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #d8c7ff",
            outline: "none"
          }}
        />

        {busqueda && (
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => setBusqueda("")}
              style={{
                backgroundColor: "#7c4dff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "7px 12px",
                cursor: "pointer"
              }}
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>

      {productosFiltrados.length > 0 ? (
        <>
          

          <ItemList productos={productosPaginados} oferta={oferta} />

          <Paginador />
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No se encontraron productos.
        </p>
      )}
    </div>
  );
}

export default ItemListContainer;