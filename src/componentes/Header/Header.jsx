import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import CartWidget from "../CartWidget/CartWidget";

function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.superior}>

        <img
          src="/images/logo.png"
          alt="Caja Didáctica"
          className={styles.logo}
        />

        <p className={styles.subtitulo}>
          Lecturas, materiales y secuencias
        </p>

      </div>

      <nav className={styles.nav}>

        <div className={styles.links}>
          <Link to="/">Inicio</Link>
          <Link to="/antologias">Antologías</Link>
          <Link to="/cuadernillos">Cuadernillos</Link>
          <Link to="/fechas">Fechas Especiales</Link>
          <Link to="/juegos">Juegos</Link>
          <Link to="/alta-producto">Alta Producto</Link>
          <Link to="/contacto">Contacto</Link>

        </div>

        <div className={styles.carrito}>
          <CartWidget />
        </div>

      </nav>

    </header>
  );
}

export default Header;