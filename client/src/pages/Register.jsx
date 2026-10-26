import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';

export default function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', f);
      nav('/login');
    } catch (e) { setErr(e.response?.data?.message || 'Registration failed'); }
  };
  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h1>🎮 GameVault</h1>
        <p className="muted">Create your account</p>
        {err && <div className="error">{err}</div>}
        <input placeholder="Name" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input type="email" placeholder="Email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input type="password" placeholder="Password (min 6)" minLength={6} required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <button className="btn primary">Register</button>
        <p className="muted">Have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
