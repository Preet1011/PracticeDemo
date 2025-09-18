import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ p, onAdd }) => {
  const BASE_URL = 'http://localhost:5000/';  
  const imageUrl = p.image ? BASE_URL + p.image : 'https://picsum.photos/300/200';

  return (
    <div className="card h-100">
      <img
        src={imageUrl}
        className="card-img-top"
        style={{ height: 140, objectFit: 'cover' }}
        alt={p.title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{p.title}</h5>
        <p className="card-text text-truncate">{p.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹{p.price}</strong>
          <div>
            <Link to={`/product/${p._id}`} className="btn btn-sm btn-secondary me-2">
              View Details
            </Link>
            <button className="btn btn-sm btn-primary" onClick={() => onAdd(p)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
