import { useState } from 'react';
import { API } from '../api'; 
import React from 'react';

const AddProduct = ({ onAddProduct }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: null, 
  });
  const [msg, setMsg] = useState('');
  const [imagePreview, setImagePreview] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prevForm) => ({ ...prevForm, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', Number(form.price));
    formData.append('image', form.image); 

    try {
      const response = await API.post('/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newProduct = response.data;
      setMsg('Product added successfully!');
      setForm({ title: '', description: '', price: '', image: null });
      setImagePreview('');
      onAddProduct(newProduct);

      setTimeout(() => {
        setMsg('');
      }, 1000);
    } catch (err) {
      setMsg('Failed to add product');
      setTimeout(() => {
        setMsg('');
      }, 1000);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Product Image</label>
          <input
            className="form-control"
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        <div className="col-12">
          <button className="btn btn-success" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
