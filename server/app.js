const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const wordRoutes = require('./routes/wordRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimit');

// Load env from server/.env first, then fallback to repo root .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Security & basic middleware
app.use(helmet());
const allowedOriginsFromEnv = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const allowedOriginPatterns = [
  /^https?:\/\/.*\.web\.app$/,
  /^https?:\/\/.*\.firebaseapp\.com$/,
  /^https?:\/\/.*\.cloudfunctions\.net$/
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOriginsFromEnv.includes(origin) ||
        defaultAllowedOrigins.includes(origin) ||
        allowedOriginPatterns.some((re) => re.test(origin))
      ) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/', apiLimiter);

// API routes
app.use('/api/words', wordRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = { app };


