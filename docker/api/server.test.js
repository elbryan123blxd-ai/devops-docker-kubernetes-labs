const request = require("supertest");

const mockRows = [];
let mockNextId = 1;

const mockQuery = jest.fn(async (text, params = []) => {
  if (text.includes("CREATE TABLE")) return {};
  if (text.includes("COUNT(*)")) return { rows: [{ n: 0 }] };
  if (text.startsWith("INSERT")) {
    const [name, description, price, stock] = params;
    const row = { id: mockNextId++, name, description, price, stock };
    mockRows.push(row);
    return { rows: [row] };
  }
  if (text.startsWith("SELECT") && text.includes("WHERE id")) {
    const id = params[0];
    return { rows: mockRows.filter((r) => String(r.id) === String(id)) };
  }
  if (text.startsWith("SELECT")) {
    return { rows: [...mockRows] };
  }
  if (text.startsWith("UPDATE")) {
    const id = params[params.length - 1];
    const row = mockRows.find((r) => String(r.id) === String(id));
    if (!row) return { rows: [] };
    const [name, description, price, stock] = params;
    if (name !== undefined) row.name = name;
    if (description !== undefined) row.description = description;
    if (price !== undefined) row.price = price;
    if (stock !== undefined) row.stock = stock;
    return { rows: [row] };
  }
  if (text.startsWith("DELETE")) {
    const id = params[0];
    const i = mockRows.findIndex((r) => String(r.id) === String(id));
    if (i >= 0) {
      mockRows.splice(i, 1);
      return { rowCount: 1 };
    }
    return { rowCount: 0 };
  }
  return { rows: [] };
});

const mockPool = { query: mockQuery, end: jest.fn() };
jest.mock("pg", () => ({ Pool: jest.fn(() => mockPool) }));

const { app, pool, ensureSchema } = require("./server");

beforeAll(async () => {
  await ensureSchema();
});

afterAll(async () => {
  await pool.end();
});

test("GET /api/products retorna una lista", async () => {
  const res = await request(app).get("/api/products");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /api/products crea y GET por id lo devuelve", async () => {
  const created = await request(app)
    .post("/api/products")
    .send({ name: "Test", description: "x", price: 5.5, stock: 3 });
  expect(created.status).toBe(201);
  expect(created.body.id).toBeDefined();

  const got = await request(app).get(`/api/products/${created.body.id}`);
  expect(got.status).toBe(200);
  expect(got.body.name).toBe("Test");
});

test("POST sin name retorna 400", async () => {
  const res = await request(app).post("/api/products").send({});
  expect(res.status).toBe(400);
});

test("DELETE elimina el producto", async () => {
  const created = await request(app).post("/api/products").send({ name: "ToDelete" });
  const id = created.body.id;
  const del = await request(app).delete(`/api/products/${id}`);
  expect(del.status).toBe(204);
  const got = await request(app).get(`/api/products/${id}`);
  expect(got.status).toBe(404);
});
