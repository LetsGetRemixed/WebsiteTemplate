const path = require('path');
const dotenv = require('dotenv');
const { app } = require('./app');
const { connectDB } = require('./config/database');
// When running in Firebase Functions, export the app for use by functions
if (process.env.FUNCTIONS_EMULATOR || process.env.K_SERVICE) {
  module.exports = { app };
}

// Ensure .env is loaded from the project root even if started from the server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
    // Connect to the database in the background so the server is immediately available
    // This prevents client proxy ECONNREFUSED during slow DB server selection
    connectDB().catch((err) => {
      console.error('❌ Background DB connect failed:', err?.message || err);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
