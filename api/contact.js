import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import xss from 'xss';
import sanitize from 'mongo-sanitize';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projectCategory: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Global cache for serverless environment
let cachedDb = null;
const rateLimitMap = new Map();

export default async function handler(req, res) {
  // CORS Configuration
  const allowedOrigins = ['https://saimhassan.dev', 'https://saimhassan-dev.vercel.app', 'http://localhost:5173'];
  const origin = req.headers.origin;

  res.setHeader('Access-Control-Allow-Credentials', true);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Allow non-browser requests (like Postman during dev) if needed, or strict block
    res.setHeader('Access-Control-Allow-Origin', '*'); 
  } else {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Rate Limiting
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const limit = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const rateData = rateLimitMap.get(ip);
    if (now > rateData.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (rateData.count >= limit) {
      return res.status(429).json({ success: false, message: 'Too many requests. Try again later.' });
    } else {
      rateData.count++;
    }
  }

  try {
    // Input Sanitization (NoSQL Injection prevention)
    const cleanBody = sanitize(req.body);
    
    // XSS Prevention
    const name = xss(cleanBody.name);
    const email = xss(cleanBody.email);
    const projectCategory = xss(cleanBody.projectCategory);
    const message = xss(cleanBody.message);

    if (!name || !email || !projectCategory || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    if (message.length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters' });
    }

    // Database Connection Caching
    if (!cachedDb) {
      cachedDb = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      }).then(mongoose => mongoose.connection);
    }
    await cachedDb;

    const contact = new Contact({ name, email, projectCategory, message });
    await contact.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: "New Client Message",
          text: `Name: ${name}\nEmail: ${email}\nCategory: ${projectCategory}\nMessage: ${message}`
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return res.status(201).json({ success: true, message: 'Message saved, but email notification failed.' });
      }
    }

    return res.status(201).json({ success: true, message: 'Message received successfully!' });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
