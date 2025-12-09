const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');
const kanbanRoutes = require('./routes/kanban');

const app = express();

app.use(express.json());              // JSON
app.use(logger);                      // собственный middleware
app.use(express.static('public'));    // статические файлы

app.use('/api', kanbanRoutes);        // маршруты

app.listen(3000, () => {
  console.log('Server started http://localhost:3000');
});
