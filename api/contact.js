import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// ─── Mongoose Schema ───────────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name:            { type: String, required: true, trim: true },
  email:           { type: String, required: true, trim: true, lowercase: true },
  projectCategory: { type: String, required: true, trim: true },
  message:         { type: String, required: true, trim: true },
  createdAt:       { type: Date,   default: Date.now }
});

// Safe model registration for serverless hot-reloads
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// ─── Mongoose Connection Caching (critical for Vercel serverless) ──────────────
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set in Vercel dashboard.');
  }

  cachedConnection = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  return cachedConnection;
}

// ─── Rate Limiting (in-memory, per warm serverless instance) ──────────────────
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const limit = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true; // allowed
  }
  if (entry.count >= limit) {
    return false; // blocked
  }
  entry.count++;
  return true; // allowed
}

// ─── Simple sanitizer (no extra dependencies) ─────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/[$]/g, '')       // remove MongoDB operator prefix
    .trim()
    .slice(0, 2000);           // max length
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  const allowedOrigins = [
    'https://saimhassan.dev',
    'https://saimhassan-dev.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  const origin = req.headers.origin;

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Rate limit
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress
    || 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait 15 minutes and try again.'
    });
  }

  // Parse + validate body
  const body = req.body || {};
  const name            = sanitize(body.name);
  const email           = sanitize(body.email);
  const projectCategory = sanitize(body.projectCategory);
  const message         = sanitize(body.message);

  if (!name || !email || !projectCategory || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }
  if (message.length < 10) {
    return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
  }

  // Connect to DB
  try {
    await connectDB();
  } catch (dbErr) {
    console.error('[DB CONNECTION ERROR]', dbErr.message);
    return res.status(500).json({
      success: false,
      message: dbErr.message.includes('MONGODB_URI')
        ? 'Server configuration error: database URL not set.'
        : 'Database connection failed. Please try again later.'
    });
  }

  // Save to DB
  try {
    const contact = new Contact({ name, email, projectCategory, message });
    await contact.save();
  } catch (saveErr) {
    console.error('[DB SAVE ERROR]', saveErr.message);
    return res.status(500).json({ success: false, message: 'Failed to save your message. Please try again.' });
  }

  // Send email
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New message from ${name} — ${projectCategory}`,
        text: [
          `Name:     ${name}`,
          `Email:    ${email}`,
          `Category: ${projectCategory}`,
          '',
          `Message:`,
          message,
        ].join('\n'),
      });
    } catch (mailErr) {
      console.error('[EMAIL ERROR]', mailErr.message);
      // Message is saved in DB, so still return success but log the email failure
      return res.status(201).json({
        success: true,
        message: 'Message received! (Email notification failed internally — we will still get back to you.)'
      });
    }
  }

  return res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.' });
}
