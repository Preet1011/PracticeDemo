import { useEffect, useState } from 'react';
import { API } from '../api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import AddProduct from './AddProduct';  

const Products=()=> {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false); 
  const { addToCart } = useAuth();

  useEffect(() => {
    API.get('/products')
      .then(r => setProducts(r.data))
      .catch(() => setErr('Failed to load products'));
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);  
    setShowAddProductForm(false); 
  };

  return (
    <div>
      <h2>Products</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setShowAddProductForm(true)}
      >
        Add Product
      </button>
      {showAddProductForm && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddProductForm(false)} 
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <AddProduct onAddProduct={handleAddProduct} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-3">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard p={p} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Products;