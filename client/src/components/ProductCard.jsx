import React from 'react';

export default function ProductCard({ p, onAdd }){
  return (
    <div className="card h-100">
      <img src={p.image || 'https://picsum.photos/300/200'} className="card-img-top" style={{height:140, objectFit:'cover'}} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{p.title}</h5>
        <p className="card-text text-truncate">{p.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹{p.price}</strong>
          <button className="btn btn-sm btn-primary" onClick={() => onAdd(p)}>Add</button>
        </div>
      </div>
    </div>
  );
}
