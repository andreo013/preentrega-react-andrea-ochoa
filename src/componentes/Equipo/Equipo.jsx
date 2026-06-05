import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function Equipo() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    const equipoCollection = collection(db, "equipo");

 getDocs(equipoCollection).then((resp) => {
  const integrantes = resp.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  integrantes.sort((a, b) => a.orden - b.orden);

  setEquipo(integrantes);
});
  }, []);

  return (
    <section>
      <h2 className="titulo-sale">Nuestro equipo</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "30px",
          marginBottom: "40px"
        }}
      >
        {equipo.map((integrante) => (
          <a
            key={integrante.id}
            href={integrante.linkedinURL}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={integrante.fotoURL}
              alt={integrante.nombre}
              title={`${integrante.nombre} - ${integrante.rol}`}
              style={{ width: "260px", borderRadius: "18px" }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default Equipo;