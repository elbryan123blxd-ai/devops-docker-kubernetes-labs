const { startWorker } = require("./worker");

test("startWorker arranca sin lanzar y devuelve un timer", () => {
  const id = startWorker();
  expect(typeof id).toBe("object");
  expect(typeof id.unref).toBe("function");
  clearInterval(id);
});
