import ItemListContainer from "../componentes/Productos/ItemListContainer/ItemListContainer";

function Inicio() {
  return (
    <div className="contenido">
      <h1 className="titulo-sale">¿Quiénes somos?</h1>

      <section className="presentacion">
        <img
          src="/images/reseñas/Presentacion.png"
          alt="Presentación de la tienda"
          className="imagen-presentacion"
        />
      </section>

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
          <img
            src="/images/Sofia.jpeg"
            alt="Sofia"
            style={{ width: "260px", borderRadius: "18px" }}
          />

          <img
            src="/images/Silvina.jpeg"
            alt="Silvina"
            style={{ width: "260px", borderRadius: "18px" }}
          />

          <img
            src="/images/Eliana.jpeg"
            alt="Eliana"
            style={{ width: "260px", borderRadius: "18px" }}
          />
        </div>
      </section>

      <section>
        <h1 className="titulo-sale">
          Ofertas del <span>MES</span>
        </h1>

        <ItemListContainer destacados={true} oferta={true} />
      </section>

      <section>
        <h1 className="titulo-sale">Reseñas</h1>

        <div className="slider-reseñas">
          <div className="grupo-reseñas grupo-1">
            <img src="/images/reseñas/Profesor Franco.jpeg" alt="Reseña Franco" />
            <img src="/images/reseñas/Profesor Mariano.jpeg" alt="Reseña Mariano" />
            <img src="/images/reseñas/Profesor Ulises.jpeg" alt="Reseña Ulises" />
            <img src="/images/reseñas/Profesora Carla.jpeg" alt="Reseña Carla" />
          </div>

          <div className="grupo-reseñas grupo-2">
            <img src="/images/reseñas/Profesora Cecilia.jpeg" alt="Reseña Cecilia" />
            <img src="/images/reseñas/Profesora Maria.jpeg" alt="Reseña María" />
            <img src="/images/reseñas/Profesora Natalia.jpeg" alt="Reseña Natalia" />
            <img src="/images/reseñas/Profesora Romina.jpeg" alt="Reseña Romina" />
          </div>

          <div className="grupo-reseñas grupo-3">
            <img src="/images/reseñas/Profesora Silvia.jpeg" alt="Reseña Silvia" />
            <img src="/images/reseñas/Profesora Stella.jpeg" alt="Reseña Stella" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio;