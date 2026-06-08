import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import CartWidget from "../CartWidget/CartWidget";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate("/");
  };

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
          <NavLink to="/" className={({ isActive }) => isActive ? styles.activo : ""}>
            Inicio
          </NavLink>

          <NavLink to="/antologias" className={({ isActive }) => isActive ? styles.activo : ""}>
            Antologías
          </NavLink>

          <NavLink to="/cuadernillos" className={({ isActive }) => isActive ? styles.activo : ""}>
            Cuadernillos
          </NavLink>

          <NavLink to="/fechas" className={({ isActive }) => isActive ? styles.activo : ""}>
            Fechas Especiales
          </NavLink>

          <NavLink to="/juegos" className={({ isActive }) => isActive ? styles.activo : ""}>
            Juegos
          </NavLink>

          {user?.rol === "admin" && (
            <>
              <NavLink to="/alta-producto" className={({ isActive }) => isActive ? styles.activo : ""}>
                Alta Producto
              </NavLink>

              <NavLink to="/admin/cupones" className={({ isActive }) => isActive ? styles.activo : ""}>
                Cupones
              </NavLink>
            </>
          )}

          <NavLink to="/contacto" className={({ isActive }) => isActive ? styles.activo : ""}>
            Contacto
          </NavLink>

          {user ? (
            <>
              <NavLink to="/perfil" className={({ isActive }) => isActive ? styles.activo : ""}>
                Perfil
              </NavLink>

              <span
                onClick={cerrarSesion}
                style={{
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Cerrar sesión
              </span>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? styles.activo : ""}>
              Login
            </NavLink>
          )}
        </div>

        <div className={styles.carrito}>
          <CartWidget />
        </div>
      </nav>
    </header>
  );
}

export default Header;