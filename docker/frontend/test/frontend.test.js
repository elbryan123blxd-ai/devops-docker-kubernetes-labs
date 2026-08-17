const fs = require("fs");
const path = require("path");

test("public/index.html existe y es HTML valido", () => {
  const p = path.join(__dirname, "..", "public", "index.html");
  expect(fs.existsSync(p)).toBe(true);
  expect(fs.readFileSync(p, "utf8")).toMatch(/<html/i);
});
