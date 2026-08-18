const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Crea la tabla si no existe y siembra un producto de ejemplo la primera vez.
async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(10,2) NOT NULL DEFAULT 0,
      stock INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `);
  const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM products");
  if (rows[0].n === 0) {
    await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES ($1,$2,$3,$4)",
      ["Demo Product", "Producto de ejemplo", 9.99, 10]
    );
  }
}

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  let db = "down";
  try {
    await pool.query("SELECT 1");
    db = "up";
  } catch (_) {
    // ignora: reporta estado pero responde 200
  }
  res.json({ status: "ok", db });
});

app.get("/api/products", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM products ORDER BY id");
  res.json(rows);
});

app.get("/api/products/:id", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});

app.post("/api/products", async (req, res) => {
  const { name, description = "", price = 0, stock = 0 } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  const { rows } = await pool.query(
    "INSERT INTO products (name, description, price, stock) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, description, price, stock]
  );
  res.status(201).json(rows[0]);
});

app.put("/api/products/:id", async (req, res) => {
  const { name, description, price, stock } = req.body || {};
  const { rows } = await pool.query(
    `UPDATE products SET
       name = COALESCE($2, name),
       description = COALESCE($3, description),
       price = COALESCE($4, price),
       stock = COALESCE($5, stock)
     WHERE id=$1 RETURNING *`,
    [req.params.id, name, description, price, stock]
  );
  if (rows.length === 0) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});

app.delete("/api/products/:id", async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

// Reintenta la conexion a la BD para no crash-loop si RDS tarda en estar listo.
async function start() {
  let connected = false;
  for (let i = 0; i < 10 && !connected; i++) {
    try {
      await ensureSchema();
      connected = true;
    } catch (e) {
      console.error(`DB not ready (intento ${i + 1}/10): ${e.message}`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  if (!connected) {
    console.error("No se pudo conectar a la BD. Saliendo.");
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`API listening on ${PORT}`));
}

if (require.main === module) {
  start();
}

module.exports = { app, pool, ensureSchema };
