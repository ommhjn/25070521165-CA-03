import { useState } from 'react';
import { PLATFORMS, GENRES, STATUSES } from './constants.js';

const empty = { title: '', platform: PLATFORMS[0], genre: GENRES[0], status: 'Backlog', score: 0, hoursPlayed: 0, metacritic: 0, releaseYear: new Date().getFullYear(), review: '' };

export default function GameForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(initial || empty);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    onSave({ ...f, score: +f.score, hoursPlayed: +f.hoursPlayed, metacritic: +f.metacritic, releaseYear: +f.releaseYear });
  };
  return (
    <div className="modal-bg" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>{initial ? 'Edit Game' : 'Add Game'}</h2>
        <label>Title<input required value={f.title} onChange={set('title')} /></label>
        <div className="row">
          <label>Platform<select value={f.platform} onChange={set('platform')}>{PLATFORMS.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label>Genre<select value={f.genre} onChange={set('genre')}>{GENRES.map((g) => <option key={g}>{g}</option>)}</select></label>
        </div>
        <label>Status<select value={f.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
        <div className="row">
          <label>My Score (0-10)<input type="number" min="0" max="10" step="0.5" value={f.score} onChange={set('score')} /></label>
          <label>Hours Played<input type="number" min="0" step="0.5" value={f.hoursPlayed} onChange={set('hoursPlayed')} /></label>
        </div>
        <div className="row">
          <label>Metacritic (0-100)<input type="number" min="0" max="100" value={f.metacritic} onChange={set('metacritic')} /></label>
          <label>Release Year<input type="number" min="1970" max="2100" value={f.releaseYear} onChange={set('releaseYear')} /></label>
        </div>
        <label>Review<textarea rows="3" value={f.review} onChange={set('review')} /></label>
        <div className="row end">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn primary">Save</button>
        </div>
      </form>
    </div>
  );
}
