require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));
app.get('/', (_req, res) => res.send('GameVault API running'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server on port ' + (process.env.PORT || 5000)));
  })
  .catch((e) => console.error('MongoDB connection failed:', e.message));
