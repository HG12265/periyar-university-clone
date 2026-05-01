const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all news ordered by creation date descending
router.get('/', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY createdAt DESC, id DESC').all();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a news item
router.post('/', (req, res) => {
  try {
    const { date, title, url } = req.body;
    
    if (!date || !title || !url) {
      return res.status(400).json({ error: 'Missing required fields (date, title, url)' });
    }

    const stmt = db.prepare('INSERT INTO news (date, title, url) VALUES (?, ?, ?)');
    const info = stmt.run(date, title, url);
    
    res.status(201).json({ id: info.lastInsertRowid, date, title, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a news item
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM news WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes > 0) {
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'News item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
