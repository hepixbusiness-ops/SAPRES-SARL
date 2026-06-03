const mongoose = require('mongoose');
const { mongoUri } = require('./env');

module.exports = async function connectDB() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected successfully');
  } catch (err) {
    console.error('✗ MongoDB connection error:', err.message);
    throw err;
  }
};
