const functions = require('firebase-functions');
const { app } = require('./app');

// Trust proxy when running behind Cloud Functions load balancer
app.set('trust proxy', 1);

// Export Express app as a single HTTPS function
exports.api = functions.region('us-central1').https.onRequest(app);


