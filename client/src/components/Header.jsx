import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';


export default function Header(){
  const { user, logout, cart } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">MERN Ecom</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
          </ul>
          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-light me-2" to="/cart">
              <i className="bi bi-cart"></i> Cart <span className="badge bg-light text-dark ms-1">{cart.length}</span>
            </Link>
            {user ? (
              <>
                <span className="text-white me-2">Hi, {user.name}</span>
                <button className="btn btn-light btn-sm" onClick={() => { logout(); nav('/'); }}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                <Link className="btn btn-light" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
