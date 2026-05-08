const db = require('../config/db');

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await db.query('SELECT * FROM settings');
    const result = {};
    settings.forEach(s => {
      try {
        result[s.key] = JSON.parse(s.value);
      } catch (e) {
        result[s.key] = s.value;
      }
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    if (!value) return res.status(400).json({ error: 'Missing value' });

    const jsonString = JSON.stringify(value);
    await db.query(
      'INSERT INTO settings (\`key\`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?',
      [key, jsonString, jsonString]
    );

    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
