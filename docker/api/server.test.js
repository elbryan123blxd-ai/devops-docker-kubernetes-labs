process.env.API_TOKEN = "test-token";
const request = require("supertest");
const server = require("./server");

afterAll(() => {
  server.close();
});

test("rechaza sin token (401)", async () => {
  const res = await request(server).get("/");
  expect(res.status).toBe(401);
  expect(res.body.error).toBe("unauthorized");
});

test("responde 200 con Bearer correcto", async () => {
  const res = await request(server)
    .get("/")
    .set("Authorization", "Bearer test-token");
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("api ok");
});

test("rechaza token incorrecto (401)", async () => {
  const res = await request(server)
    .get("/")
    .set("Authorization", "Bearer wrong");
  expect(res.status).toBe(401);
});
