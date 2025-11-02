import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/components/Cart.css";

export default function Cart({ carritoId }) {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [totalConIva, setTotalConIva] = useState(0);
  const [ordenCreada, setOrdenCreada] = useState(null);

  const loadItems = async () => {
    try {
      const [itemsRes, totalRes] = await Promise.all([
        axios.get(`http://localhost:8081/carritos/${carritoId}/items`),
        axios.get(`http://localhost:8081/carritos/${carritoId}/total`),
      ]);

      const totalNum = Number(totalRes.data?.total ?? 0);
      const ivaCalc = totalNum * 0.19;
      const totalFinal = totalNum + ivaCalc;

      setItems(itemsRes.data || []);
      setSubtotal(totalNum);
      setIva(ivaCalc);
      setTotalConIva(totalFinal);
    } catch (e) {
      console.error("Error cargando carrito:", e);
    }
  };

  const removeItem = async (productoId) => {
    try {
      await axios.delete(
        `http://localhost:8081/carritos/${carritoId}/items/${productoId}`
      );
      await loadItems();
    } catch (e) {
      console.error("Error eliminando del carrito:", e);
    }
  };

  const vaciarCarrito = async () => {
    try {
      await axios.delete(`http://localhost:8081/carritos/${carritoId}/items`);
      setItems([]);
      setSubtotal(0);
      setIva(0);
      setTotalConIva(0);
    } catch (e) {
      console.error("Error al vaciar carrito:", e);
    }
  };

  const crearOrden = async () => {
    const nuevaOrden = {
      id: Math.floor(Math.random() * 10000),
      fecha: new Date().toLocaleString(),
      subtotal,
      iva,
      total: totalConIva,
      productos: items.map((it) => ({
        nombre: it.nombre,
        cantidad: it.cantidad,
        subtotal: Number(it.subtotal || 0),
      })),
    };

    setOrdenCreada(nuevaOrden);

    await vaciarCarrito();
  };

  useEffect(() => {
    if (carritoId) loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carritoId]);

  return (
    <div className="cart">
      <h2>🛒 Carrito</h2>

      {items.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <ul className="cart-list">
          {items.map((it) => (
            <li key={it.id} className="cart-item">
              <div className="cart-info">
                <strong>{it.nombre}</strong>
                <span>x{it.cantidad}</span>
              </div>
              <div className="cart-actions">
                <span>${Number(it.subtotal).toFixed(2)}</span>
                <button onClick={() => removeItem(it.id_producto || it.producto_id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-footer">
        <div className="cart-total">
          <p>Subtotal: <strong>${Number(subtotal).toFixed(2)}</strong></p>
          <p>IVA (19%): <strong>${Number(iva).toFixed(2)}</strong></p>
          <p className="cart-total-final">Total: <strong>${Number(totalConIva).toFixed(2)}</strong></p>
        </div>
        <button
          className="cart-checkout"
          disabled={items.length === 0}
          onClick={crearOrden}
        >
          Crear orden
        </button>
      </div>

      {/* resumen */}
      {ordenCreada && (
        <div className="order-modal-overlay" onClick={() => setOrdenCreada(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <h3>🧾 Resumen de la compra</h3>
            <p>ID de orden: <strong>#{ordenCreada.id}</strong></p>
            <p>Fecha: {ordenCreada.fecha}</p>

            <ul className="order-items">
              {ordenCreada.productos.map((p, i) => (
                <li key={i}>
                  {p.nombre} x{p.cantidad} — ${Number(p.subtotal).toFixed(2)}
                </li>
              ))}
            </ul>

            <div className="order-summary">
              <p>Subtotal: ${Number(ordenCreada.subtotal).toFixed(2)}</p>
              <p>IVA (19%): ${Number(ordenCreada.iva).toFixed(2)}</p>
              <h4>Total: ${Number(ordenCreada.total).toFixed(2)}</h4>
            </div>

            <div className="order-thanks">
              <p>¡Gracias por tu compra! 🎉</p>
              <p>
                Comunícate a{" "}
                <a href="mailto:smartin14@unisalle.edu.co">smartin14@unisalle.edu.co</a>{" "}
                para coordinar el envío.
              </p>
              <a
                className="order-email-btn"
                href={`mailto:smartin14@unisalle.edu.co?subject=Envío%20pedido%20#${ordenCreada.id}&body=Hola,%20quiero%20coordinar%20el%20envío%20del%20pedido%20#${ordenCreada.id}.`}
              >
                Escribir por correo
              </a>
            </div>

            <button className="order-close" onClick={() => setOrdenCreada(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
