const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
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

app.get("/api/health", async (req, res) => {
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

// Visor de tablas de solo lectura contra la RDS (lab). Se consulta desde
// dentro del cluster, donde la BD es alcanzable, sin exponer la RDS publicamente.
app.get("/api/viewer", (req, res) => {
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<title>Visor de tablas - RDS</title>
<style>
  body{font-family:system-ui,Arial,sans-serif;margin:2rem;background:#0f172a;color:#e2e8f0}
  textarea{width:100%;height:90px;font-family:monospace;background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:8px;padding:.6rem}
  button{margin-top:.6rem;padding:.5rem 1rem;border:0;border-radius:8px;background:#22c55e;color:#04210f;font-weight:600;cursor:pointer}
  table{border-collapse:collapse;margin-top:1rem;width:100%}
  th,td{border:1px solid #334155;padding:.4rem .6rem;text-align:left}
  th{background:#1e293b}
  .err{color:#f87171;margin-top:1rem}
  code{background:#1e293b;padding:0 .3rem;border-radius:4px}
</style>
</head>
<body>
  <h2>Visor de tablas (RDS / Postgres - solo lectura)</h2>
  <p>Corre consultas SELECT contra tu base de datos en AWS. Ej: <code>SELECT * FROM products</code> o <code>SELECT table_name FROM information_schema.tables WHERE table_schema='public'</code></p>
  <textarea id="sql">SELECT * FROM products</textarea><br/>
  <button onclick="run()">Ejecutar</button>
  <div id="out"></div>
  <script>
    function run(){
      var sql=document.getElementById('sql').value;
      var out=document.getElementById('out');
      out.innerHTML='<p>Ejecutando...</p>';
      fetch('/api/query',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sql:sql})})
        .then(function(r){return r.json().then(function(j){return {ok:r.ok,body:j};});})
        .then(function(x){
          if(!x.ok){out.innerHTML='<p class="err">Error: '+(x.body.error||'desconocido')+'</p>';return;}
          var cols=x.body.columns||[]; var rows=x.body.rows||[];
          if(cols.length===0){out.innerHTML='<p>Sin columnas. Filas: '+rows.length+'</p>';return;}
          var h='<table><thead><tr>'+cols.map(function(c){return '<th>'+esc(c)+'</th>';}).join('')+'</tr></thead><tbody>';
          for(var i=0;i<rows.length;i++){h+='<tr>'+cols.map(function(c){return '<td>'+esc(rows[i][c])+'</td>';}).join('')+'</tr>';}
          h+='</tbody></table><p>'+rows.length+' fila(s)</p>';
          out.innerHTML=h;
        })
        .catch(function(e){out.innerHTML='<p class="err">'+e+'</p>';});
    }
    function esc(v){if(v===null)return 'NULL';return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  </script>
</body>
</html>`;
  res.send(html);
});

app.post("/api/query", async (req, res) => {
  const sql = (req.body && req.body.sql) || "";
  const upper = sql.trim().toUpperCase();
  // Solo lectura: bloquea cualquier cosa que no sea SELECT/WITH/SHOW/TABLE.
  if (!/^(SELECT|WITH|SHOW|TABLE)\b/.test(upper)) {
    return res.status(400).json({ error: "Solo consultas de lectura (SELECT / WITH / SHOW / TABLE)." });
  }
  try {
    const r = await pool.query(sql);
    res.json({ columns: (r.fields || []).map((f) => f.name), rows: r.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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
