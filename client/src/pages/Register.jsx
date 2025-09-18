import { useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Register=()=> {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await API.post('/auth/register', form);
      alert('Registered, please login');
      nav('/login');
    } catch (err) {
      setErr(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="col-md-6 d-flex justify-content-center align-items-center bg-gradient-left">
        <div className="text-center text-white p-5">
          <h1 className="display-3 font-weight-bold text-shadow">Welcome to Ecom</h1>
          <p className="lead mb-4">Where Shopping Feels Like a Party!</p>
          <p className="lead">Join us today and start exploring amazing deals!</p>
          <div className="mt-4">
            <img src="https://via.placeholder.com/250" alt="Welcome" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center bg-form">
        <div className="form-card shadow-lg rounded-lg p-4">
          <h2 className="text-center mb-4">Create Your Account</h2>
          {err && <div className="alert alert-danger">{err}</div>}
          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control input-field"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control input-field"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control input-field"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary w-100 py-3 mt-3 btn-animate">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
