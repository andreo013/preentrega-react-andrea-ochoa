import React from "react";
import { NavLink } from "react-router-dom";
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

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/antologias"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Antologías
          </NavLink>

          <NavLink
            to="/cuadernillos"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Cuadernillos
          </NavLink>

          <NavLink
            to="/fechas"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Fechas Especiales
          </NavLink>

          <NavLink
            to="/juegos"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Juegos
          </NavLink>

          <NavLink
            to="/alta-producto"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Alta Producto
          </NavLink>


          <NavLink
            to="/admin/cupones"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Cupones
          </NavLink>



          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              isActive ? styles.activo : ""
            }
          >
            Contacto
          </NavLink>

        </div>

        <div className={styles.carrito}>
          <CartWidget />
        </div>

      </nav>

    </header>
  );
}

export default Header;