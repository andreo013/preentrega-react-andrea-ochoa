import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");

  const obtenerCupones = async () => {
    const cuponesRef = collection(db, "cupones");
    const resp = await getDocs(cuponesRef);

    const cuponesFirebase = resp.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setCupones(cuponesFirebase);
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!codigo || !descuento) {
      toast.warning("Completá todos los campos.");
      return;
    }

    const nuevoCupon = {
      codigo: codigo.toUpperCase(),
      descuento: Number(descuento)
    };

    const cuponesRef = collection(db, "cupones");
    const docRef = await addDoc(cuponesRef, nuevoCupon);

    setCupones([
      ...cupones,
      {
        id: docRef.id,
        ...nuevoCupon
      }
    ]);

    setCodigo("");
    setDescuento("");

    toast.success("Cupón creado correctamente.");
  };

  const eliminarCupon = async (id) => {
    const confirmar = window.confirm("¿Querés eliminar este cupón?");

    if (confirmar) {
      const cuponRef = doc(db, "cupones", id);

      await deleteDoc(cuponRef);

      setCupones(cupones.filter((cupon) => cupon.id !== id));

      toast.success("Cupón eliminado correctamente.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Caja Didáctica | Gestión de Cupones</title>

        <meta
          name="description"
          content="Panel de administración para crear y eliminar cupones de descuento en Caja Didáctica."
        />
      </Helmet>

      <div className="contenido">
        <h1>Gestión de cupones</h1>

        <form
          onSubmit={manejarEnvio}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "360px",
            margin: "30px auto",
            padding: "1.5rem",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            gap: "12px"
          }}
        >
          <h3>Crear cupón</h3>

          <div>
            <label>Código del cupón:</label>
            <input
              type="text"
              placeholder="Ej: BIENVENIDA10"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>

          <div>
            <label>Porcentaje de descuento:</label>
            <input
              type="number"
              placeholder="Ej: 10"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#7c4dff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Guardar cupón
          </button>
        </form>

        <hr />

        <h2>Cupones cargados</h2>

        {cupones.length === 0 ? (
          <p>No hay cupones cargados.</p>
        ) : (
          <ul>
            {cupones.map((cupon) => (
              <li key={cupon.id} style={{ marginBottom: "10px" }}>
                <strong>{cupon.codigo}</strong> - {cupon.descuento}% de
                descuento

                <button
                  onClick={() => eliminarCupon(cupon.id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 8px",
                    cursor: "pointer"
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default GestionCupones;