function Footer() {
  return (
    <footer
      style={{
        background: "#7c4dff",
        color: "white",
        padding: "14px 40px",
        marginTop: "40px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Caja Didáctica</strong> - Recursos y materiales educativos para docentes.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <img
            src="/images/email.png"
            alt="Email"
            style={{ width: "24px" }}
          />

          <p style={{ margin: 0 }}>
            contacto@cajadidactica.com
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "80px",
            alignItems: "center",
            marginRight: "60px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
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
              gap: "6px"
            }}
          >
            <img
              src="/images/tk.png"
              alt="TikTok"
              style={{ width: "28px" }}
            />

            <span>@cajadidactica</span>
          </div>
        </div>
      </div>

      <p
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
          fontSize: "14px"
        }}
      >
        © 2026 Andrea Ochoa - Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;