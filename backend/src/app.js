const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notFound.middleware');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// API routes (versioned)
app.use('/api/v1', routes);

// 404 handler and error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
