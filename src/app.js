const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const deckRoutes = require('./routes/deckRoutes'); // Similar al userRoutes
// const cardRoutes = require('./routes/cardRoutes'); // Similar al userRoutes

const app = express();
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', deckRoutes);
// app.use('/api', cardRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
