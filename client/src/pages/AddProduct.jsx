import { useState } from "react";
import { API } from "../api";

export default function AddProduct() {
  const [form, setForm] = useState({ title: "", description: "", price: "", image: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products/add", {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        image: form.image,
      });
      setMsg("✅ Product added successfully!");
      setForm({ title: "", description: "", price: "", image: "" });
    } catch (err) {
      setMsg("❌ Failed to add product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input className="form-control" type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange}></textarea>
        </div>
        <div className="col-12">
          <label className="form-label">Image URL</label>
          <input className="form-control" name="image" value={form.image} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button className="btn btn-success" type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
}
