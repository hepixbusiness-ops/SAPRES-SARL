const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Basic validation/defaults
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '3000';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sapres';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'replace_me_with_secure_secret_key_1234567890';
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
process.env.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
};
