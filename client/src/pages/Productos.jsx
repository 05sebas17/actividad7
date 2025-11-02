import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pages/productos.css";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [carritoId, setCarritoId] = useState(null);

  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    precioMin: "",
    precioMax: "",
  });

  const inicializarCarrito = async () => {
    try {
      const saved = localStorage.getItem("carrito_id");
      if (saved) {
        setCarritoId(saved);
      } else {
        const res = await axios.post("http://localhost:8081/carritos");
        localStorage.setItem("carrito_id", res.data.carrito_id);
        setCarritoId(res.data.carrito_id);
      }
    } catch (err) {
      console.error("Error creando carrito:", err);
    }
  };

  const cargarDatos = async () => {
    try {
      const [prodRes, catRes, marRes] = await Promise.all([
        axios.get("http://localhost:8081/productos"),
        axios.get("http://localhost:8081/categorias"),
        axios.get("http://localhost:8081/marcas"),
      ]);
      setProductos(prodRes.data);
      setFiltrados(prodRes.data);
      setCategorias(catRes.data);
      setMarcas(marRes.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  useEffect(() => {
    inicializarCarrito();
    cargarDatos();
  }, []);

  const aplicarFiltros = (f) => {
    let res = [...productos];

    if (f.nombre) {
      const q = f.nombre.toLowerCase();
      res = res.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p.descripcion || "").toLowerCase().includes(q)
      );
    }

    if (f.categoria) res = res.filter((p) => p.categoria === f.categoria);
    if (f.marca) res = res.filter((p) => p.marca === f.marca);

    if (f.precioMin) res = res.filter((p) => Number(p.precio) >= Number(f.precioMin));
    if (f.precioMax) res = res.filter((p) => Number(p.precio) <= Number(f.precioMax));

    setFiltrados(res);
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    const next = { ...filtros, [name]: value };
    setFiltros(next);
    aplicarFiltros(next);
  };
  const limpiar = () => {
    const base = { nombre: "", categoria: "", marca: "", precioMin: "", precioMax: "" };
    setFiltros(base);
    setFiltrados(productos);
  };

  const agregarAlCarrito = async (producto_id) => {
    if (!carritoId) return alert("⚠️ Carrito no inicializado");
    try {
      await axios.post(`http://localhost:8081/carritos/${carritoId}/items`, {
        producto_id,
      });
      alert(" Producto agregado al carrito");
    } catch (err) {
      console.error("Error agregando al carrito:", err);
    }
  };

  return (
    <div className="productos-container">
      <header className="productos-header">
        <h1>🛍️ Catálogo de Productos</h1>
        <p>Explora nuestros artículos disponibles en la tienda.</p>
      </header>

      {/* Barra de filtros */}
      <section className="productos-filtros">
        <div className="filtros-barra">
          <input
            type="text"
            name="nombre"
            placeholder="Buscar por nombre o descripción..."
            value={filtros.nombre}
            onChange={handleFiltroChange}
          />

          <select
            name="categoria"
            value={filtros.categoria}
            onChange={handleFiltroChange}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>

          <select
            name="marca"
            value={filtros.marca}
            onChange={handleFiltroChange}
          >
            <option value="">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.nombre}>
                {m.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="precioMin"
            placeholder="Precio mínimo"
            value={filtros.precioMin}
            onChange={handleFiltroChange}
          />

          <input
            type="number"
            name="precioMax"
            placeholder="Precio máximo"
            value={filtros.precioMax}
            onChange={handleFiltroChange}
          />

          <button onClick={limpiar}>Limpiar</button>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="productos-grid">
        {filtrados.length > 0 ? (
          filtrados.map((prod) => (
            <ProductCard
              key={prod.id}
              producto={prod}
              onAgregar={() => agregarAlCarrito(prod.id)}
            />
          ))
        ) : (
          <p className="no-products">No hay productos que coincidan con los filtros.</p>
        )}
      </section>
    </div>
  );
}
