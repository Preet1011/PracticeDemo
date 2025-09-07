import React, { useEffect, useState, useRef } from 'react';
import { API } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const fileInputRef = useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(() => setErr('Authentication required or error fetching users'));
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', password: '', role: 'user' });
    setModalOpen(true);
  };

  const openEditModal = user => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
    setModalOpen(true);
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingUser) {
      API.put(`/users/${editingUser._id}`, form)
        .then(() => {
          fetchUsers();
          setModalOpen(false);
        })
        .catch(err => alert(err.response?.data?.message || 'Update failed'));
    } else {
      API.post('/users/add', form)
        .then(() => {
          fetchUsers();
          setModalOpen(false);
        })
        .catch(err => alert(err.response?.data?.message || 'Create failed'));
    }
  };

  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    API.delete(`/users/${id}`)
      .then(() => fetchUsers())
      .catch(err => alert(err.response?.data?.message || 'Delete failed'));
  };

  const handleCSVUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    API.post('/users/uploadcsv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        alert(res.data.message);
        fetchUsers();
        fileInputRef.current.value = null;
      })
      .catch(err => alert(err.response?.data?.message || 'CSV Upload failed'));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users Management</h2>
      {err && <div className="alert alert-warning">{err}</div>}

      <div className="mb-4 d-flex gap-2">
        <button className="btn btn-primary" onClick={openCreateModal}>
          Create User
        </button>
        <label className="btn btn-secondary mb-0">
          Upload CSV
          <input
            type="file"
            accept=".csv"
            hidden
            ref={fileInputRef}
            onChange={handleCSVUpload}
          />
        </label>
      </div>
      <div className="row g-3">
        {users.map(user => (
          <div key={user._id} className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <b>Email:</b> {user.email} <br />
                    <b>Role:</b> {user.role}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingUser ? 'Edit User' : 'Create User'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {!editingUser && (
                    <input
                      type="password"
                      className="form-control mb-3"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  )}
                  <select
                    className="form-select"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingUser ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
