import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://saimhassan-dev.vercel.app',
    'https://saimhassan.dev'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// DATABASE CONNECTION
// ============================================

connectDB();

// ============================================
// API ROUTES
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    success: true,
    status: '✓ Backend is running',
    database: mongoStatus,
    timestamp: new Date().toISOString()
  });
});

// MongoDB status diagnostic endpoint
app.get('/api/db-status', (req, res) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  res.json({
    mongodbStatus: states[mongoose.connection.readyState],
    database: mongoose.connection.name || 'N/A',
    host: mongoose.connection.host || 'N/A',
    hasUri: !!process.env.MONGODB_URI,
    isPlaceholder: process.env.MONGODB_URI?.includes('username:password') || false
  });
});

// API routes
app.use('/api', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════╗');
  console.log('║  Portfolio Backend Server Started  ║');
  console.log('╠════════════════════════════════════╣');
  console.log(`║  Port: ${PORT.toString().padEnd(27)} ║`);
  console.log(`║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(18)} ║`);
  console.log(`║  Database: ${(mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected').padEnd(21)} ║`);
  console.log('╚════════════════════════════════════╝\n');
});

export default app;
