const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all settings
router.get('/', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM settings').all();
    const result = {};
    settings.forEach(s => {
      result[s.key] = JSON.parse(s.value);
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a setting
router.put('/:key', (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body; // value should be a JSON object/array

    if (!value) {
      return res.status(400).json({ error: 'Missing value' });
    }

    const jsonString = JSON.stringify(value);
    
    const stmt = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
    stmt.run(key, jsonString);
    
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
