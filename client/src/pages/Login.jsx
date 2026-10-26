import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';

export default function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', f);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/home');
    } catch (e) { setErr(e.response?.data?.message || 'Login failed'); }
  };
  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h1>🎮 GameVault</h1>
        <p className="muted">Log in to your game library</p>
        {err && <div className="error">{err}</div>}
        <input type="email" placeholder="Email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input type="password" placeholder="Password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <button className="btn primary">Login</button>
        <p className="muted">New here? <Link to="/register">Create account</Link></p>
      </form>
    </div>
  );
}
