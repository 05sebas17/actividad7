import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1 */}
        <div className="footer-col">
          <h4 className="footer-logo">
            <a href="/" className="footer-logo-link">
              <span>Moda</span> Tenis
            </a>
          </h4>
          <p className="footer-text">
            © {new Date().getFullYear()} <strong>Moda Tenis</strong>
          </p>
          <p className="footer-subtext">
            Diseñado por el equipo <strong>U La Salle</strong>
          </p>
        </div>

        {/* Columna 2 */}
        <div className="footer-col">
          <h5 className="footer-title">Mapa del sitio</h5>
          <ul className="footer-links">
            <li>
              <a href="/about">Nuestro Equipo</a>
            </li>
            <li>
              <a href="/products">Productos</a>
            </li>
          </ul>
        </div>


      </div>
    </footer>
  );
}
