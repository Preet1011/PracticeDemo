import { useState } from 'react';
import { API } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      nav('/');
    } catch (err) {
      setErr(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Section: Welcome */}
      <div className="col-md-6 d-flex justify-content-center align-items-center bg-gradient-left">
        <div className="text-center text-white p-5">
          <h1 className="display-3 font-weight-bold text-shadow">Welcome Back!</h1>
          <p className="lead mb-4">It’s time to continue your shopping journey!</p>
          <p className="lead">Log in and enjoy your personalized experience!</p>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="col-md-6 d-flex justify-content-center align-items-center bg-form">
        <div className="form-card shadow-lg rounded-lg p-4">
          <h2 className="text-center mb-4">Login to Your Account</h2>
          {err && <div className="alert alert-danger">{err}</div>}
          <form onSubmit={submit}>
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
            <button className="btn btn-primary w-100 py-3 mt-3 btn-animate">Login</button>
            <p className="text-center mt-3">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
