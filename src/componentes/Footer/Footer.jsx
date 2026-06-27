function Footer() {
  return (
    <footer
      style={{
        background: "#7c4dff",
        color: "white",
        padding: "18px 20px",
        marginTop: "40px",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
          textAlign: "center"
        }}
      >
        <p
          style={{
            margin: 0,
            maxWidth: "320px"
          }}
        >
          <strong>Caja Didáctica</strong> - Recursos y materiales educativos
          para docentes.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            minWidth: "220px"
          }}
        >
          <img src="/images/email.png" alt="Email" style={{ width: "24px" }} />

          <p
            style={{
              margin: 0,
              wordBreak: "break-word"
            }}
          >
            contacto@cajadidactica.com
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
          >
            <img
              src="/images/ig.png"
              alt="Instagram"
              style={{ width: "28px" }}
            />

            <span>@cajadidactica</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
          >
            <img src="/images/tk.png" alt="TikTok" style={{ width: "28px" }} />

            <span>@cajadidactica</span>
          </div>
        </div>
      </div>

      <p
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "18px",
          marginBottom: 0,
          fontSize: "14px"
        }}
      >
        © 2026 Andrea Ochoa - Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;