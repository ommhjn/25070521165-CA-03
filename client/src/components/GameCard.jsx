const badgeClass = (m) => (m >= 75 ? 'good' : m >= 50 ? 'mid' : m > 0 ? 'bad' : 'none');
const statusClass = (s) => s.split(' ')[0].toLowerCase();

export default function GameCard({ game, onEdit, onDelete, onHours }) {
  return (
    <div className="card">
      <div className="card-top">
        <div>
          <h3>{game.title}</h3>
          <p className="muted">{game.platform} • {game.genre} • {game.releaseYear}</p>
        </div>
        <span className={`meta ${badgeClass(game.metacritic)}`} title="Metacritic score">{game.metacritic || '–'}</span>
      </div>
      <span className={`tag ${statusClass(game.status)}`}>{game.status}</span>
      <div className="stats">
        <div><b>{game.score}/10</b><small>My score</small></div>
        <div><b>{game.hoursPlayed}h</b><small>Played</small></div>
      </div>
      {game.review && <p className="review">“{game.review}”</p>}
      <div className="actions">
        <button className="btn sm" onClick={() => onHours(game)}>+1h</button>
        <button className="btn sm" onClick={() => onEdit(game)}>Edit</button>
        <button className="btn sm danger" onClick={() => onDelete(game)}>Delete</button>
      </div>
    </div>
  );
}
