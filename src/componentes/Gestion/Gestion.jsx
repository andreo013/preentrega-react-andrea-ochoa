import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioAltaProductoContainer from "../FormularioAltaProducto/FormularioAltaProductoContainer";
import { toast } from "react-toastify";
import { Container, Card, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

function Gestion() {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const obtenerProductos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);

      const productosFirebase = resp.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      productosFirebase.sort((a, b) => {
        const ordenCategorias = {
          antologias: 1,
          cuadernillos: 2,
          fechas: 3,
          juegos: 4
        };

        const categoriaA = ordenCategorias[a.categoria] || 99;
        const categoriaB = ordenCategorias[b.categoria] || 99;

        if (categoriaA !== categoriaB) {
          return categoriaA - categoriaB;
        }

        return (a.nombre || "").localeCompare(b.nombre || "", "es", {
          sensitivity: "base"
        });
      });

      setProductos(productosFirebase);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.error("Error al cargar los productos.");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  };

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás segura de que querés eliminar este producto?"
    );

    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", id);

        await deleteDoc(docRef);

        setProductos(productos.filter((prod) => prod.id !== id));

        toast.success("Producto eliminado.");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        toast.error("Error al eliminar el producto.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Gestión de Productos</title>

        <meta
          name="description"
          content="Panel de administración para agregar, editar y eliminar materiales didácticos."
        />
      </Helmet>

      <Container className="contenido py-4">
        <h1 className="text-center mb-4">Gestión de productos</h1>

        <FormularioAltaProductoContainer
          productoAEditar={productoAEditar}
          cancelarEdicion={cancelarEdicion}
          actualizarListado={obtenerProductos}
        />

        <hr className="my-5" />

        <h2 className="text-center mb-4">Lista de productos</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
            justifyItems: "center"
          }}
        >
          {productos.map((prod) => (
            <Card
              key={prod.id}
              className="shadow-sm border-0"
              style={{
                width: "100%",
                maxWidth: "270px",
                borderRadius: "18px",
                backgroundColor: "#ffffff",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(124, 77, 255, 0.15)"
              }}
            >
              <div
                style={{
                  backgroundColor: "#f3ecff",
                  margin: "12px",
                  padding: "12px",
                  borderRadius: "14px",
                  textAlign: "center"
                }}
              >
                <Card.Img
                  src={prod.imagen}
                  alt={prod.nombre}
                  style={{
                    width: "100%",
                    height: "145px",
                    objectFit: "contain",
                    borderRadius: "10px"
                  }}
                />
              </div>

              <Card.Body
                className="text-center d-flex flex-column"
                style={{ padding: "12px" }}
              >
                <Card.Title
                  style={{
                    color: "#5f2eea",
                    fontWeight: "700",
                    fontSize: "1.15rem",
                    marginBottom: "8px"
                  }}
                >
                  {prod.nombre}
                </Card.Title>

                <Card.Text style={{ marginBottom: "4px" }}>
                  <strong>Precio:</strong> ${prod.precio}
                </Card.Text>

                <Card.Text style={{ marginBottom: "12px" }}>
                  <strong>Stock:</strong> {prod.stock}
                </Card.Text>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginTop: "20px"
                  }}
                >
                  <Button
                    onClick={() => handleEditClick(prod)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 14px rgba(0,0,0,.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    style={{
                      backgroundColor: "#9b7cff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px 14px",
                      color: "white",
                      cursor: "pointer",
                      transition: "all .25s ease"
                    }}
                  >
                    <FaEdit /> Editar
                  </Button>

                  <Button
                    onClick={() => handleDelete(prod.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 14px rgba(0,0,0,.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    style={{
                      backgroundColor: "#f27b7b",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px 14px",
                      color: "white",
                      cursor: "pointer",
                      transition: "all .25s ease"
                    }}
                  >
                    <FaTrash /> Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Gestion;