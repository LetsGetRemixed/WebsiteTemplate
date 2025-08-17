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
app.use('/', apiLimiter);

// API routes (support both Hosting rewrite (/api/...) and direct CF URL (/...))
app.use('/api/words', wordRoutes);
app.use('/words', wordRoutes);
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Health check (both paths)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Database status endpoint to help diagnose Atlas connectivity
app.get(['/api/db-status', '/db-status'], async (req, res) => {
  try {
    const mongoose = require('mongoose')
    const state = mongoose.connection.readyState
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
    const status = states[state] || String(state)
    const collections = status === 'connected' ? Object.keys(mongoose.connection.collections || {}) : []
    res.json({ success: true, status, collections })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
})

// Debug: masked environment inspection (enable by setting DEBUG_ENV_ENDPOINT=true)
const isDebugEnvEndpointEnabled = (process.env.DEBUG_ENV_ENDPOINT || '').toLowerCase() === 'true'
const mask = (value) => {
  if (!value) return null
  const str = String(value)
  if (str.length <= 8) return '****'
  return `${str.slice(0, 4)}***${str.slice(-4)}`
}

const collectEnv = () => ({
  NODE_ENV: process.env.NODE_ENV || null,
  CLIENT_URL: process.env.CLIENT_URL || null,
  MONGODB_URI: mask(process.env.MONGODB_URI),
  JWT_SECRET: mask(process.env.JWT_SECRET),
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || null,
  EMAIL_USERNAME: mask(process.env.EMAIL_USERNAME),
  EMAIL_FROM: process.env.EMAIL_FROM || null,
})

const debugEnvHandler = (req, res) => {
  const data = collectEnv()
  console.log('[ENV DEBUG]', Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? null])))
  res.json({ success: true, env: data })
}

if (isDebugEnvEndpointEnabled) {
  app.get('/api/__env', debugEnvHandler)
  app.get('/__env', debugEnvHandler)
  app.get('/api/env', debugEnvHandler)
  app.get('/env', debugEnvHandler)
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = { app };


