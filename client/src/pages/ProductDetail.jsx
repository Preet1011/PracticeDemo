import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import { API } from '../api'; 
import { useAuth } from '../context/AuthContext'; 

const ProductDetail = () => {
  const { productId } = useParams();  
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { addToCart } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch(() => setError('Failed to load product details'));
  }, [productId]);
  if (!product) return <div>Loading...</div>;
  const BASE_URL = 'http://localhost:5000/';

  const imageUrl = product.image ? BASE_URL + product.image : 'https://picsum.photos/500/500';

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Back to Products
      </button>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-6">
          <img
            src={imageUrl}
            className="img-fluid rounded shadow-lg"
            alt={product.title}
            style={{ objectFit: 'cover', height: '400px' }}
          />
        </div>
        <div className="col-md-6">
          <div className="product-info">
            <h2 className="text-primary mb-3">{product.title}</h2>
            <p className="text-muted">{product.description}</p>
            <h3 className="mt-3">₹{product.price}</h3>
            <button 
              className="btn btn-success btn-lg mt-4 w-100"
              onClick={() => addToCart(product)}
            >
              <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
