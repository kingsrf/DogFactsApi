// server.js

// Using commonjs module system, was having issues testing with esm imports/exports

const express  = require('express');
const dogFacts = require('./dog_facts-1.js');

const app  = express();
const port = process.env.PORT || 3000;

app.get('/facts', (req, res) => {
  const { number } = req.query;
  let factsToReturn = dogFacts;

  if (number !== undefined) {
    const num = Number.parseInt(number, 10);
    if (Number.isNaN(num) || num < 1) {
      return res.status(400).json({ success: false, error: 'Invalid number parameter' });
    }
    factsToReturn = dogFacts.slice(0, num);
  }

  res.json({ facts: factsToReturn, success: true });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// only starts server if ran directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Dog Facts API server running on port ${port}`);
  });
}

module.exports = app;
