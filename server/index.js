import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

app.get("/productos", (req, res) => {
  const q = `
    SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock,
           p.imagen,
           c.nombre AS categoria, m.nombre AS marca,
           p.categoria_id, p.marca_id
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN marcas m ON p.marca_id = m.id
    ORDER BY p.id DESC;
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
});

app.post("/productos", upload.single("imagen"), (req, res) => {
  const { nombre, descripcion, precio, stock, categoria_id, marca_id } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;
  const q = `
    INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca_id, imagen)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    q,
    [nombre, descripcion, precio, stock, categoria_id || null, marca_id || null, imagen],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ Producto agregado correctamente", imagen });
    }
  );
});

app.put("/productos/:id", upload.single("imagen"), (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoria_id, marca_id } = req.body;
  let imagenValue = null;
  if (req.file) {
    imagenValue = `/uploads/${req.file.filename}`;
  } else if (typeof req.body.imagen === "string" && req.body.imagen.trim() !== "") {
    imagenValue = req.body.imagen.trim();
  }
  const q = `
    UPDATE productos
    SET nombre=?, descripcion=?, precio=?, stock=?, categoria_id=?, marca_id=?,
        imagen = COALESCE(?, imagen)
    WHERE id=?;
  `;
  db.query(
    q,
    [nombre, descripcion, precio, stock, categoria_id || null, marca_id || null, imagenValue, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ Producto actualizado correctamente" });
    }
  );
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Producto eliminado correctamente" });
  });
});

app.post("/carritos", (req, res) => {
  db.query("INSERT INTO carritos () VALUES ()", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ carrito_id: result.insertId });
  });
});

app.get("/carritos/:id/items", (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT ci.id, p.id AS producto_id, p.nombre, p.precio, ci.cantidad,
           (p.precio * ci.cantidad) AS subtotal
    FROM carrito_items ci
    JOIN productos p ON ci.producto_id = p.id
    WHERE ci.carrito_id = ?;
  `;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.post("/carritos/:id/items", (req, res) => {
  const { id } = req.params;
  const { producto_id } = req.body;
  if (!producto_id) return res.status(400).json({ error: "producto_id es requerido" });
  const q = `
    INSERT INTO carrito_items (carrito_id, producto_id, cantidad)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE cantidad = cantidad + 1;
  `;
  db.query(q, [id, producto_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Producto agregado al carrito" });
  });
});

app.delete("/carritos/:id/items/:producto_id", (req, res) => {
  const { id, producto_id } = req.params;
  const q = "DELETE FROM carrito_items WHERE carrito_id = ? AND producto_id = ?";
  db.query(q, [id, producto_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "🗑️ Producto eliminado del carrito" });
  });
});

app.delete("/carritos/:id/items", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM carrito_items WHERE carrito_id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🧹 Carrito vaciado correctamente" });
  });
});

app.get("/carritos/:id/total", (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT COALESCE(SUM(p.precio * ci.cantidad), 0) AS total
    FROM carrito_items ci
    JOIN productos p ON ci.producto_id = p.id
    WHERE ci.carrito_id = ?;
  `;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json({ total: data[0].total || 0 });
  });
});

app.post("/pedidos", (req, res) => {
  const { carrito_id } = req.body;
  if (!carrito_id) return res.status(400).json({ error: "carrito_id es requerido" });
  const qTotal = `
    SELECT COALESCE(SUM(p.precio * ci.cantidad), 0) AS total
    FROM carrito_items ci
    JOIN productos p ON ci.producto_id = p.id
    WHERE ci.carrito_id = ?;
  `;
  db.query(qTotal, [carrito_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const total = result[0]?.total ?? 0;
    const qInsert = `
      INSERT INTO pedidos (carrito_id, total, estado, fecha)
      VALUES (?, ?, 'CREADO', NOW());
    `;
    db.query(qInsert, [carrito_id, total], (err2, result2) => {
      if (err2) return res.status(500).json({ error: err2 });
      const pedido_id = result2.insertId;
      const qStock = `
        UPDATE productos p
        JOIN carrito_items ci ON ci.producto_id = p.id
        SET p.stock = p.stock - ci.cantidad
        WHERE ci.carrito_id = ?;
      `;
      db.query(qStock, [carrito_id], (err3) => {
        if (err3) return res.status(500).json({ error: err3 });
        db.query("DELETE FROM carrito_items WHERE carrito_id = ?", [carrito_id], () => {
          res.json({
            message: "✅ Pedido creado correctamente",
            pedido_id,
            total: total.toFixed(2),
          });
        });
      });
    });
  });
});

app.get("/pedidos", (req, res) => {
  const q = `
    SELECT p.id, p.fecha, p.total, p.estado, c.id AS carrito_id
    FROM pedidos p
    JOIN carritos c ON p.carrito_id = c.id
    ORDER BY p.fecha DESC;
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
});

app.get("/categorias", (req, res) => {
  db.query("SELECT id, nombre FROM categorias ORDER BY nombre", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.get("/marcas", (req, res) => {
  db.query("SELECT id, nombre FROM marcas ORDER BY nombre", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`);
});
