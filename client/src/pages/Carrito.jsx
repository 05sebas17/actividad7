import Cart from "../components/Cart";

export default function Carrito() {
  const carritoId = localStorage.getItem("carrito_id");

  return (
    <div className="carrito-page">
      <header className="productos-header">
        <h1>🛒 Tu Carrito de Compras</h1>
        <p>Revisa tus productos antes de generar la orden.</p>
      </header>

      {carritoId ? (
        <Cart carritoId={carritoId} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#777" }}>
          No tienes un carrito activo. Agrega productos desde la tienda.
        </p>
      )}
    </div>
  );
}
