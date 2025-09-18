import React, { useEffect, useState } from 'react';
import { API } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    API.get('/users')
      .then(r => setUsers(r.data))
      .catch(() => setErr('Auth required'));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      API.put(`/users/${editingId}`, form)
        .then(() => {
          fetchUsers();
          setEditingId(null);
          setForm({ name: '', email: '', password: '', role: 'user' });
        })
        .catch(err => alert(err.response?.data?.message || 'Update failed'));
    } else {
      API.post('/users/add', form)
        .then(() => {
          fetchUsers();
          setForm({ name: '', email: '', password: '', role: 'user' });
        })
        .catch(err => alert(err.response?.data?.message || 'Create failed'));
    }
  };

  const handleEdit = user => {
    setEditingId(user._id);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
  };

  const handleDelete = id => {
    if (!window.confirm('Are you sure?')) return;
    API.delete(`/users/${id}`)
      .then(() => fetchUsers())
      .catch(err => alert(err.response?.data?.message || 'Delete failed'));
  };

  return (
    <div className="container mt-4">
      <h2>Users (Protected)</h2>
      {err && <div className="alert alert-warning">{err}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {!editingId && (
          <input
            className="form-control mb-2"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        )}
        <select
          className="form-control mb-2"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-primary" type="submit">
          {editingId ? 'Update User' : 'Add User'}
        </button>
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Users;
