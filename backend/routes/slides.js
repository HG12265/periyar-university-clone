const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/slides');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all slides
router.get('/', (req, res) => {
  try {
    const slides = db.prepare('SELECT * FROM slides ORDER BY orderIndex ASC').all();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new slide
router.post('/', upload.single('file'), (req, res) => {
  try {
    const { alt } = req.body;
    let type = req.body.type;
    let src = req.body.src; // Could be a remote URL or existing path

    // If a file was uploaded, construct the src path
    if (req.file) {
      src = '/uploads/slides/' + req.file.filename;
      
      // Auto-detect type based on mimetype
      if (req.file.mimetype.startsWith('video/')) {
        type = 'video';
      } else {
        type = 'image';
      }
    }

    if (!src || !type || !alt) {
      return res.status(400).json({ error: 'Missing required fields (type, src, alt)' });
    }

    // Get max orderIndex
    const maxOrderRow = db.prepare('SELECT MAX(orderIndex) as maxOrder FROM slides').get();
    const nextOrder = (maxOrderRow.maxOrder || 0) + 1;

    const stmt = db.prepare('INSERT INTO slides (type, src, alt, orderIndex) VALUES (?, ?, ?, ?)');
    const info = stmt.run(type, src, alt, nextOrder);
    
    res.status(201).json({ id: info.lastInsertRowid, type, src, alt, orderIndex: nextOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update slide order
router.put('/reorder', (req, res) => {
  try {
    const { orderedIds } = req.body; // Array of slide IDs in the new order
    
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds must be an array' });
    }

    const updateStmt = db.prepare('UPDATE slides SET orderIndex = ? WHERE id = ?');
    
    const transaction = db.transaction((ids) => {
      ids.forEach((id, index) => {
        updateStmt.run(index, id);
      });
    });

    transaction(orderedIds);
    res.json({ message: 'Reordered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a slide
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Optional: Get slide to delete file from disk
    const slide = db.prepare('SELECT src FROM slides WHERE id = ?').get(id);
    
    const stmt = db.prepare('DELETE FROM slides WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes > 0) {
      // If it was an uploaded file, delete it
      if (slide && slide.src && slide.src.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', slide.src);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'Slide not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
