import { useEffect, useState } from 'react';
import { API } from '../api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState('');
  const { addToCart } = useAuth();

  useEffect(()=>{
    API.get('/products').then(r=> setProducts(r.data)).catch(()=> setErr('Failed to load'));
  },[]);

  return (
    <div>
      <h2>Products</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="row g-3">
        {products.map(p=> <div className="col-md-4" key={p._id}><ProductCard p={p} onAdd={addToCart} /></div>)}
      </div>
    </div>
  );
}
