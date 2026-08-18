const { Pool } = require("pg");

const INTERVAL = 30000;
const LOW_STOCK_THRESHOLD = 5;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

async function checkLowStock() {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, stock FROM products WHERE stock < $1 ORDER BY stock",
      [LOW_STOCK_THRESHOLD]
    );
    if (rows.length === 0) {
      console.log(`[worker] stock OK (umbral ${LOW_STOCK_THRESHOLD})`);
    } else {
      for (const p of rows) {
        console.log(`[worker][ALERTA] stock bajo: #${p.id} ${p.name} (${p.stock})`);
      }
    }
  } catch (e) {
    console.error(`[worker] error consultando BD: ${e.message}`);
  }
}

function startWorker() {
  console.log("worker started");
  checkLowStock();
  return setInterval(checkLowStock, INTERVAL);
}

if (require.main === module) {
  startWorker();
}

module.exports = { startWorker, checkLowStock, pool };
