const request = require("supertest");
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
