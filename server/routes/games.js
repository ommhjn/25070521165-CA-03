const router = require('express').Router();
const auth = require('../middleware/auth');
const Game = require('../models/Game');
router.use(auth);

// READ (with optional filters)
router.get('/', async (req, res) => {
  const q = { user: req.userId };
  ['platform', 'genre', 'status'].forEach((k) => { if (req.query[k]) q[k] = req.query[k]; });
  res.json(await Game.find(q).sort({ createdAt: -1 }));
});

// CREATE
router.post('/', async (req, res) => {
  try { res.status(201).json(await Game.create({ ...req.body, user: req.userId })); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const g = await Game.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true, runValidators: true });
    if (!g) return res.status(404).json({ message: 'Game not found' });
    res.json(g);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const g = await Game.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!g) return res.status(404).json({ message: 'Game not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
