const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Import routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const quizRoutes = require('./routes/quizRoutes');
const chatRoutes = require('./routes/chatRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/auth', limiter);

// Body parsing & uploads serving
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/study-plan', studyPlanRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Database connection & server start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thinked';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('[Database] Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`[Server] Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[Error] MongoDB connection error:', err);
  });

module.exports = app;
