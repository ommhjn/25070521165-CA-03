import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import GameCard from '../components/GameCard.jsx';
import GameForm from '../components/GameForm.jsx';
import { PLATFORMS, GENRES, STATUSES } from '../components/constants.js';

export default function Home() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ platform: '', genre: '', status: '' });
  const [modal, setModal] = useState(null); // null | 'new' | game object
  const [loading, setLoading] = useState(true);

  const logout = () => { localStorage.clear(); nav('/login'); };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const { data } = await api.get('/games', { params });
      setGames(data);
    } catch (e) {
      if (e.response?.status === 401) logout();
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    if (modal && modal._id) await api.put(`/games/${modal._id}`, data);
    else await api.post('/games', data);
    setModal(null);
    load();
  };
  const remove = async (g) => {
    if (!confirm(`Remove "${g.title}"?`)) return;
    await api.delete(`/games/${g._id}`);
    load();
  };
  const addHour = async (g) => {
    await api.put(`/games/${g._id}`, { hoursPlayed: g.hoursPlayed + 1 });
    load();
  };

  const total = games.reduce((s, g) => s + g.hoursPlayed, 0);

  return (
    <>
      <header className="nav">
        <h2>🎮 GameVault</h2>
        <div><span className="muted">Hi, {user.name} </span><button className="btn sm" onClick={logout}>Logout</button></div>
      </header>
      <main className="container">
        <div className="toolbar">
          <select value={filters.platform} onChange={(e) => setFilters({ ...filters, platform: e.target.value })}>
            <option value="">All Platforms</option>{PLATFORMS.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={filters.genre} onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
            <option value="">All Genres</option>{GENRES.map((g) => <option key={g}>{g}</option>)}
          </select>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All Status</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="btn primary" onClick={() => setModal('new')}>+ Add Game</button>
        </div>
        <p className="muted">{games.length} games • {total}h total playtime</p>
        {loading ? <p>Loading…</p> : games.length === 0 ? <p className="empty">No games found. Add your first one!</p> : (
          <div className="grid">
            {games.map((g) => <GameCard key={g._id} game={g} onEdit={setModal} onDelete={remove} onHours={addHour} />)}
          </div>
        )}
      </main>
      {modal && <GameForm initial={modal === 'new' ? null : modal} onSave={save} onCancel={() => setModal(null)} />}
    </>
  );
}
