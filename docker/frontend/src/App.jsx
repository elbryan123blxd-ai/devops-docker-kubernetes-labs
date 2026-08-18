import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./api.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [editingId, setEditingId] = useState(null);

  async function load() {
    try {
      setProducts(await getProducts());
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    };
    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }
    setForm({ name: "", description: "", price: "", stock: "" });
    setEditingId(null);
    load();
  }

  function onEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description ?? "",
      price: String(p.price),
      stock: String(p.stock),
    });
  }

  async function onDelete(id) {
    await deleteProduct(id);
    load();
  }

  return (
    <div className="container">
      <h1>CloudOps Store</h1>
      {error && <p className="error">Error: {error}</p>}

      <form onSubmit={onSubmit} className="form">
        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
        <input name="description" placeholder="Descripción" value={form.description} onChange={onChange} />
        <input name="price" placeholder="Precio" type="number" step="0.01" value={form.price} onChange={onChange} />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={onChange} />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", description: "", price: "", stock: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${Number(p.price).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => onEdit(p)}>Editar</button>
                <button onClick={() => onDelete(p.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
