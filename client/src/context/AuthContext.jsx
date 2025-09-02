import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../api';
import React from 'react';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(()=>{
    if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete API.defaults.headers.common['Authorization'];
  }, [token]);

  useEffect(()=> localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const login = (data) => {
    setUser(data.user); setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };
  const logout = () => { setUser(null); setToken(null); localStorage.removeItem('user'); localStorage.removeItem('token'); };

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p._id === product._id);
      if (found) return prev.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(p => p._id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(p => p._id === id ? { ...p, qty } : p));

  return <AuthContext.Provider value={{ user, token, login, logout, cart, addToCart, removeFromCart, updateQty }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
