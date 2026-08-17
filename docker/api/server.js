const http = require("http");

const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.API_TOKEN;

const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const auth = req.headers["authorization"];

  if (!API_TOKEN || auth !== `Bearer ${API_TOKEN}`) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "unauthorized" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "api ok", time: new Date().toISOString() }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`API listening on ${PORT}`);
  });
}

module.exports = server;
