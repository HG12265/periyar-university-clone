const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const path = require('path');

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const slidesRoutes = require('./routes/slides');
const newsRoutes = require('./routes/news');
const settingsRoutes = require('./routes/settings');
app.use('/api/slides', slidesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Periyar University Clone API' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
