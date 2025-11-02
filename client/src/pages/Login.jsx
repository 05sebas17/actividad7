import { useEffect, useState, useRef } from "react";
import "../styles/pages/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // simulación: no se valida
  const [showModal, setShowModal] = useState(true); // 👈 aparece apenas entras
  const navigate = useNavigate();
  const closeBtnRef = useRef(null);

  // Accesibilidad: cerrar con ESC, enfocar el botón al abrir
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setShowModal(false); }
    if (showModal) {
      window.addEventListener("keydown", onKey);
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación: no valida nada, solo navega
    navigate("/productos-admin");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔐 Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>

      {/* Ventana emergente al entrar */}
      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-info-title"
          aria-describedby="login-info-desc"
          onClick={() => setShowModal(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-left">
              <div className="spinner" aria-hidden="true" />
            </div>
            <div className="modal-right">
              <h2 id="login-info-title" className="modal-title">
                Modo demostración
              </h2>
              <p id="login-info-desc" className="modal-text">
                Este proyecto <strong>simula</strong> la entrada de inicio de sesión:
                puedes oprimir <strong>Ingresar</strong> sin usuario ni contraseña.
              </p>
              <div className="modal-actions">
                <button
                  ref={closeBtnRef}
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Entendido
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
              <p className="modal-hint">También puedes cerrar con <kbd>Esc</kbd> o clic afuera.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
