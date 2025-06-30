const express = require('express');
const app = express();
const path = require('path');
const startPair = require('./pair');

app.use(express.static('public'));
app.use(express.json());

app.post('/pair', async (req, res) => {
  const number = req.body.number;
  if (!number || !/^94\d{8,9}$/.test(number)) {
    return res.json({ error: 'Invalid number format' });
  }

  try {
    const code = await startPair(number);
    res.json({ code });
  } catch (err) {
    res.json({ error: 'Failed to generate pairing code' });
  }
});

app.listen(3000, () => {
  console.log('🌐 Pair site running: http://localhost:3000');
});