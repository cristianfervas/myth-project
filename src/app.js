const logger = require('./config/logger');
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');
const banlistRoutes = require('./routes/banlistRoutes');
const { Sequelize } = require('sequelize');

const app = express();
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', deckRoutes);
app.use('/api', cardRoutes);
app.use('/api', banlistRoutes);

(async () => {
  try {
    await sequelize.sync();
    logger.info('Database Synced');

    const port = 3000;
    app.listen(port, () => {
      logger.info(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    if (error instanceof Sequelize.ConnectionError) {
      logger.error('Database Connection Error:', error);
    } else {
      logger.error('Error:', error.message);
    }
  }
})();
