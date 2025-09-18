import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { API } from '../api';
import React from 'react';

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useAuth();
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [msg, setMsg] = useState('');

  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const discount = coupon ? (subtotal * coupon.discountPercent / 100) : 0;
  const total = subtotal - discount;

  const apply = async () => {
    setMsg('');
    try {
      const res = await API.get('/coupons/apply/' + code);
      setCoupon(res.data);
      setMsg('Coupon applied');
    } catch (err) {
      setCoupon(null);
      setMsg(err.response?.data?.message || 'Invalid coupon');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <div className="alert alert-info">Cart is empty</div>}
      {cart.map(item => (
        <div className="d-flex align-items-center border rounded p-2 mb-2" key={item._id}>
          <img
            src={item.image || 'https://picsum.photos/80'}
            style={{ width: 80, height: 60, objectFit: 'cover' }}
            alt={item.title}
          />
          <div className="ms-3 flex-grow-1">
            <h6 className="mb-1">{item.title}</h6>
            <small>₹{item.price}</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              value={item.qty}
              min={1}
              onChange={e => updateQty(item._id, Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: 70 }}
              className="form-control form-control-sm"
            />
            <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-3">
        <h5>Summary</h5>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <div className="input-group mb-2" style={{ maxWidth: 360 }}>
          <input
            className="form-control"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="Coupon code"
          />
          <button className="btn btn-outline-secondary" onClick={apply}>
            Apply
          </button>
        </div>
        {msg && <div className="mb-2">{msg}</div>}
        {coupon && (
          <div className="mb-2">
            Coupon <b>{coupon.code}</b> - {coupon.discountPercent}%
          </div>
        )}
        <h4>Total: ₹{total.toFixed(2)}</h4>
        <button className="btn btn-primary">Checkout (demo)</button>
      </div>
    </div>
  );
};

export default Cart;
