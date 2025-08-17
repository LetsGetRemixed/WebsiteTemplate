const functions = require('firebase-functions');
const { app } = require('./app');
const { connectDB } = require('./config/database');

// Trust proxy when running behind Cloud Functions load balancer
app.set('trust proxy', 1);

// Ensure a database connection is established on cold start
connectDB().catch((err) => {
  // Log but do not crash the function
  console.error('[Functions] DB connect error:', err?.message || err);
});

// Export Express app as a single HTTPS function
exports.api = functions.region('us-central1').https.onRequest(app);


