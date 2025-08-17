const functions = require('firebase-functions');
const { app } = require('./app');
const { connectDB } = require('./config/database');

// Trust proxy when running behind Cloud Functions load balancer
app.set('trust proxy', 1);

// Masked env log on cold start to verify env injection
const mask = (value) => {
  if (!value) return null;
  const str = String(value);
  if (str.length <= 8) return '****';
  return `${str.slice(0, 4)}***${str.slice(-4)}`;
};
console.log('[Functions cold start env]', {
  NODE_ENV: process.env.NODE_ENV || null,
  CLIENT_URL: process.env.CLIENT_URL || null,
  MONGODB_URI: mask(process.env.MONGODB_URI),
});

// Ensure a database connection is established on cold start
connectDB().catch((err) => {
  // Log but do not crash the function
  console.error('[Functions] DB connect error:', err?.message || err);
});

// Export Express app as a single HTTPS function
exports.api = functions.region('us-central1').https.onRequest(app);


