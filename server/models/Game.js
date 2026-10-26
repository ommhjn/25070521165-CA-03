const mongoose = require('mongoose');
module.exports = mongoose.model('Game', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  platform: { type: String, enum: ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'], required: true },
  genre: { type: String, enum: ['RPG', 'Open World', 'FPS', 'Soulslike'], required: true },
  status: { type: String, enum: ['Currently Playing', 'Completed (100%)', 'Backlog', 'Dropped'], default: 'Backlog' },
  score: { type: Number, min: 0, max: 10, default: 0 },
  hoursPlayed: { type: Number, min: 0, default: 0 },
  metacritic: { type: Number, min: 0, max: 100, default: 0 },
  releaseYear: { type: Number, min: 1970, max: 2100 },
  review: { type: String, default: '' },
}, { timestamps: true }));
