const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', deckRoutes);
app.use('/api', cardRoutes);

sequelize.sync().then(() => {
  console.log('Database Syncronized');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
