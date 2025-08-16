const functions = require('firebase-functions');
const { app } = require('./app');

// Export Express app as a single HTTPS function
exports.api = functions.https.onRequest(app);


