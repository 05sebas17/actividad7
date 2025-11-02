import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/pages/productosAdmin.css";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
    marca_id: "",
    imagen: null,
  });
  const [editando, setEditando] = useState(false);
  const [preview, setPreview] = useState(null);
  const [filtro, setFiltro] = useState({
    q: "",
    categoria: "",
    marca: "",
    precioMin: "",
    precioMax: "",
  });

  const loadProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8081/productos");
      setProductos(res.data);
    } catch (err) {
      console.error("❌ Error al cargar productos:", err);
    }
  };

  const loadCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:8081/categorias");
      setCategorias(res.data);
    } catch (err) {
      console.error("❌ Error al cargar categorías:", err);
    }
  };

  const loadMarcas = async () => {
    try {
      const res = await axios.get("http://localhost:8081/marcas");
      setMarcas(res.data);
    } catch (err) {
      console.error("❌ Error al cargar marcas:", err);
    }
  };

  useEffect(() => {
    loadProductos();
    loadCategorias();
    loadMarcas();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files.length > 0) {
      setForm({ ...form, imagen: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion || !form.precio || !form.stock) {
      alert("⚠️ Por favor, completa todos los campos obligatorios.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("precio", form.precio);
      formData.append("stock", form.stock);
      formData.append("categoria_id", form.categoria_id || "");
      formData.append("marca_id", form.marca_id || "");
      if (form.imagen) formData.append("imagen", form.imagen);
      if (editando) {
        await axios.put(`http://localhost:8081/productos/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Producto actualizado correctamente");
      } else {
        await axios.post("http://localhost:8081/productos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Producto agregado correctamente");
      }
      setForm({
        id: null,
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria_id: "",
        marca_id: "",
        imagen: null,
      });
      setPreview(null);
      setEditando(false);
      loadProductos();
    } catch (err) {
      console.error("❌ Error al guardar producto:", err);
      alert("⚠️ Ocurrió un error al guardar el producto.");
    }
  };

  const handleEdit = (producto) => {
    setForm({
      id: producto.id,
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      stock: producto.stock || "",
      categoria_id: producto.categoria_id || "",
      marca_id: producto.marca_id || "",
      imagen: null,
    });
    setPreview(producto.imagen ? `http://localhost:8081${producto.imagen}` : null);
    setEditando(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:8081/productos/${id}`);
        alert("🗑️ Producto eliminado correctamente");
        loadProductos();
      } catch (err) {
        console.error("❌ Error al eliminar producto:", err);
        alert("⚠️ No se pudo eliminar el producto.");
      }
    }
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const texto = `${p.nombre} ${p.descripcion}`.toLowerCase();
      const q = filtro.q.toLowerCase();
      if (q && !texto.includes(q)) return false;
      if (filtro.categoria && p.categoria !== filtro.categoria) return false;
      if (filtro.marca && p.marca !== filtro.marca) return false;
      if (filtro.precioMin && p.precio < Number(filtro.precioMin)) return false;
      if (filtro.precioMax && p.precio > Number(filtro.precioMax)) return false;
      return true;
    });
  }, [productos, filtro]);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Panel De Productos</h1>
        <p>Administra el catálogo de productos de la tienda.</p>
      </header>

      <section className="admin-form">
        <h2>{editando ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
          <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
          <select name="categoria_id" value={form.categoria_id} onChange={handleChange} required>
            <option value="">Seleccionar Categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <select name="marca_id" value={form.marca_id} onChange={handleChange} required>
            <option value="">Seleccionar Marca</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
          <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
          {preview && (
            <div className="image-preview">
              <p>📸 Vista previa:</p>
              <img src={preview} alt="Vista previa" />
            </div>
          )}
          <div className="form-buttons">
            <button type="submit" className="btn-save">
              {editando ? "Guardar Cambios" : "Agregar Producto"}
            </button>
            {editando && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setEditando(false);
                  setForm({
                    id: null,
                    nombre: "",
                    descripcion: "",
                    precio: "",
                    stock: "",
                    categoria_id: "",
                    marca_id: "",
                    imagen: null,
                  });
                  setPreview(null);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-filtros">
        <h3>🔎 Filtros de búsqueda</h3>
        <div className="filtros-barra">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={filtro.q}
            onChange={(e) => setFiltro({ ...filtro, q: e.target.value })}
          />
          <select value={filtro.categoria} onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}>
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <select value={filtro.marca} onChange={(e) => setFiltro({ ...filtro, marca: e.target.value })}>
            <option value="">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.nombre}>
                {m.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Precio mínimo"
            value={filtro.precioMin}
            onChange={(e) => setFiltro({ ...filtro, precioMin: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={filtro.precioMax}
            onChange={(e) => setFiltro({ ...filtro, precioMax: e.target.value })}
          />
          <button onClick={() => setFiltro({ q: "", categoria: "", marca: "", precioMin: "", precioMax: "" })}>
            Limpiar filtros
          </button>
        </div>
      </section>

      <section className="admin-table">
        <h2>📋 Lista de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {p.imagen ? (
                      <img
                        src={`http://localhost:8081${p.imagen}`}
                        alt={p.nombre}
                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>{p.categoria || "-"}</td>
                  <td>{p.marca || "-"}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No hay productos que coincidan con el filtro.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
