const express = require('express');
const path = require('path');
const app = express();
const startPair = require('./pair');

// Middleware to serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve pair.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

// POST pairing endpoint
app.post('/pair', async (req, res) => {
  const number = req.body.number;
  if (!number || !/^94\d{8,9}$/.test(number)) {
    return res.json({ error: 'Invalid number format' });
  }
  try {
    const code = await startPair(number);
    res.json({ code });
  } catch (err) {
    console.error(err);
    res.json({ error: 'Failed to generate pairing code' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Running on http://localhost:${PORT}`);
});
