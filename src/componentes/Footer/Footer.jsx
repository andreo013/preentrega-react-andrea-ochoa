function Footer() {
  return (
    <footer
      style={{
        background: "#7c4dff",
        color: "white",
        padding: "20px",
        marginTop: "40px",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "28px",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            lineHeight: "1.3",
          }}
        >
          <strong>Caja Didáctica</strong> - Recursos y materiales educativos
          para docentes.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/images/email.png" alt="Email" style={{ width: "24px" }} />
          <span>contacto@cajadidactica.com</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/images/ig.png" alt="Instagram" style={{ width: "28px" }} />
          <span>@cajadidactica</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/images/tk.png" alt="TikTok" style={{ width: "28px" }} />
          <span>@cajadidactica</span>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "18px",
          marginBottom: 0,
          fontSize: "14px",
        }}
      >
        © 2026 Andrea Ochoa - Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;