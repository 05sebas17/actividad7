import "../styles/components/ProductCard.css";

export default function ProductCard({ producto, onAgregar }) {
  const { nombre, precio, descripcion, categoria, imagen } = producto;

  // Base del backend (puedes definir REACT_APP_API_URL en .env si quieres)
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8081";

  // Construye la URL final de la imagen de forma segura
  const buildImageUrl = (img) => {
    if (!img || typeof img !== "string") {
      return "https://images.unsplash.com/photo-1606813902914-1383b4f4f76d?w=600";
    }

    const src = img.trim();

    // Si ya es una URL absoluta, úsala
    if (/^https?:\/\//i.test(src)) return src;

    // Si empieza con / (ej: /uploads/xxx.jpg), préfix con el backend
    if (src.startsWith("/")) return `${API_BASE}${src}`;

    // Si viene como nombre suelto (ej: foto.jpg), asume /uploads/foto.jpg
    return `${API_BASE}/uploads/${src}`;
  };

  const imagenFinal = buildImageUrl(imagen);

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <img src={imagenFinal} alt={nombre} className="product-img" />
      </div>

      <div className="product-info">
        <h3>{nombre}</h3>
        <p className="product-desc">{descripcion}</p>
        {/* Muestra la categoría si viene; si no, ocúltala */}
        {categoria ? <p className="product-category">{categoria}</p> : null}
        <div className="product-footer">
          <span className="product-price">
            ${Number(precio ?? 0).toFixed(2)}
          </span>
          <button className="add-btn" onClick={onAgregar}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
