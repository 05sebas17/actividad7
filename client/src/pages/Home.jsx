import { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../assets/images/slideshow/img2.jpg";
import img2 from "../assets/images/img12.png";
import "../styles/pages/home.css";

export default function Home() {
  const [destacados, setDestacados] = useState([]);

  // Cargar los 3 primeros productos
  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const res = await axios.get("http://localhost:8081/productos");
        // Tomamos los 3 primeros (ordenados DESC en el backend)
        setDestacados(res.data.slice(0, 3));
      } catch (err) {
        console.error("❌ Error al cargar productos destacados:", err);
      }
    };
    cargarDestacados();
  }, []);

  const buildImageUrl = (imagen) => {
    const API_BASE = "http://localhost:8081";
    if (!imagen) return "https://via.placeholder.com/400x300?text=Sin+Imagen";
    if (imagen.startsWith("http")) return imagen;
    return `${API_BASE}${imagen}`;
  };

  return (
    <>
      <main>
        {/* HERO / SLIDER PRINCIPAL */}
        <section className="slider">
          <div className="slide">
            <img src={img1} alt="Nuevos diseños" />
            <div className="slide-text">
              <h1>Nuevos Diseños</h1>
              <p>
                Descubre nuestras últimas tendencias en calzado deportivo
                con materiales sostenibles.
              </p>
              <a href="/products" className="btn-primary">
                Explorar productos
              </a>
            </div>
          </div>
        </section>

{/* SECCIÓN SOBRE NOSOTROS */}
<section className="about section">
  <div className="about-header text-center">
    <h2>
      Comienza con <span className="highlight">Moda Tenis</span>
    </h2>
    <p className="subtitle">
      Vive la energía del deporte con estilo, comodidad y autenticidad.
    </p>
  </div>

  <div className="about-content">
    <div className="about-image">
      <img src={img2} alt="Diseño deportivo" />
    </div>

    <div className="about-info">
      <h4>
        Buen <span>diseño</span> y <span>calidad</span> para tu estilo
      </h4>
      <p>
        En <strong>Moda Tenis</strong> te ofrecemos lo mejor en calzado.
        Nuestros productos combinan diseño moderno, tecnología y sostenibilidad.
      </p>
      <p>
        Somos una marca nacional con pasión por la innovación y el compromiso con el confort.
      </p>

      <a href="/nosotros" className="link-btn">
        Conoce más sobre nosotros
        <span className="arrow">→</span>
      </a>
    </div>
  </div>
</section>


        {/* SECCIÓN PRODUCTOS DESTACADOS */}
        <section className="featured section">
          <h2 className="text-center">Productos Destacados</h2>

          <div className="products-grid">
            {destacados.length > 0 ? (
              destacados.map((p) => (
                <div key={p.id} className="product-card">
                  <img
                    src={buildImageUrl(p.imagen)}
                    alt={p.nombre}
                    className="product-img"
                  />
                  <div className="product-info">
                    <span className="tag new">Nuevo</span>
                    <h5>{p.nombre}</h5>
                    <p>{p.descripcion}</p>
                    <span className="price">${p.precio}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">Cargando productos destacados...</p>
            )}
          </div>

          <div className="text-center">
            <a href="/products" className="view-all">
              Ver todos los productos →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
