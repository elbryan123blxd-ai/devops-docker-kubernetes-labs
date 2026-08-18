export async function getProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export async function createProduct(p) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function updateProduct(id, p) {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Error al actualizar");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al borrar");
}
