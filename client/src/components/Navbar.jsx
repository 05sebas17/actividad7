import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="nf-header">
      <nav className="nf-nav">
        <div className="nf-container">
          {/* Botón hamburguesa (mobile) */}
          <button
            className="nf-burger"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="nf-menu"
            onClick={toggle}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Marca */}
          <a className="nf-brand" href="/" onClick={close}>
            <strong>
              <span>Moda</span> Tenis
            </strong>
          </a>

          {/* Iconos (mobile) */}
          <div className="nf-icons nf-icons--mobile">
            <a href="/login" className="nf-icon" aria-label="Iniciar sesión" onClick={close}>
              {/* Person (SVG) */}
              <svg viewBox="0 0 24 24" className="nf-svg" aria-hidden="true">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5A1.5 1.5 0 0 0 4.5 21h15A1.5 1.5 0 0 0 21 19.5C21 16.5 17 14 12 14Z"/>
              </svg>
            </a>

            <a href="/carrito" className="nf-icon" aria-label="Carrito" onClick={close}>
              {/* Bag (SVG) */}
              <svg viewBox="0 0 24 24" className="nf-svg" aria-hidden="true">
                <path d="M7 7V6a5 5 0 0 1 10 0v1h2a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1Zm2 0h6V6a3 3 0 0 0-6 0Zm-3 2v11a0 0 0 0 0 0 0h12a0 0 0 0 0 0 0V9Z"/>
              </svg>
            </a>
          </div>

          {/* Menú colapsable */}
          <div id="nf-menu" className={`nf-menu ${open ? "is-open" : ""}`}>
            <ul className="nf-list">
              <li className="nf-item">
                <a href="/" className="nf-link nf-link--active" onClick={close}>
                  Inicio
                </a>
              </li>
              <li className="nf-item">
                <a href="/nosotros" className="nf-link" onClick={close}>
                  Nuestro Equipo
                </a>
              </li>
              <li className="nf-item">
                <a href="/products" className="nf-link" onClick={close}>
                  Productos
                </a>
              </li>
            </ul>

            {/* Iconos (desktop) */}
            <div className="nf-icons nf-icons--desktop">
              <a href="/login" className="nf-icon" aria-label="Iniciar sesión" onClick={close}>
                <svg viewBox="0 0 24 24" className="nf-svg" aria-hidden="true">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5A1.5 1.5 0 0 0 4.5 21h15A1.5 1.5 0 0 0 21 19.5C21 16.5 17 14 12 14Z"/>
                </svg>
              </a>
              <a href="/carrito" className="nf-icon" aria-label="Carrito" onClick={close}>
                <svg viewBox="0 0 24 24" className="nf-svg" aria-hidden="true">
                  <path d="M7 7V6a5 5 0 0 1 10 0v1h2a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1Zm2 0h6V6a3 3 0 0 0-6 0Zm-3 2v11a0 0 0 0 0 0 0h12a0 0 0 0 0 0 0V9Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
