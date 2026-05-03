import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  submitContact,
  getAllContacts,
  getContactById,
  getContactStats
} from '../controllers/contactController.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('projectCategory')
    .trim()
    .notEmpty().withMessage('Project category is required')
    .isIn(['Web Development', 'Mobile App', 'Design', 'Consultation', 'Other'])
    .withMessage('Invalid project category'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
    .isLength({ max: 5000 }).withMessage('Message cannot exceed 5000 characters')
];

// Error handling middleware for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Routes
router.post('/contact', validateContact, handleValidationErrors, submitContact);
router.get('/contacts', getAllContacts);
router.get('/contacts/stats', getContactStats);
router.get('/contacts/:id', getContactById);

// Test endpoint - create dummy contact
router.post('/test-contact', async (req, res) => {
  try {
    const Contact = (await import('../models/Contact.js')).default;
    const testContact = new Contact({
      name: 'Test User',
      email: 'test@example.com',
      projectCategory: 'Web Development',
      message: 'یہ ایک ٹیسٹ ہے - This is a test message with enough characters'
    });
    await testContact.save();
    res.json({ 
      success: true, 
      message: 'Test contact created!',
      contact: testContact 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;
