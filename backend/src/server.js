require('./config/env');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');

async function start() {
  try {
    await connectDB();
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`✓ Server running on port ${port}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV}`);
    });

    process.on('unhandledRejection', (err) => {
      console.error('✗ Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });

    process.on('SIGTERM', () => {
      console.log('✓ SIGTERM received, gracefully shutting down');
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error('✗ Failed to start server:', err);
    process.exit(1);
  }
}

start();
