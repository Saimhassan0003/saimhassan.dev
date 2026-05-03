import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// Initialize email transporter
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.verify((error, success) => {
    if (error) console.log("Transporter verification error:", error);
    else console.log("Server is ready to send emails");
  });

  return transporter;
};

// POST /api/contact - Submit a contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, projectCategory, message } = req.body;

    console.log('Incoming contact request body:', req.body);

    // Validate required fields
    if (!name || !email || !projectCategory || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, projectCategory, message) are required'
      });
    }

    // Create new contact document
    const contact = new Contact({
      name,
      email,
      projectCategory,
      message
    });

    // Save to database
    let saved = false;
    try {
      await contact.save();
      saved = true;
      console.log(`✓ Contact saved: ${name} (${email})`);
    } catch (dbError) {
      console.error('Database save error:', dbError.message);
    }

    // Send emails if configured
    let emailSent = false;
    const isEmailConfigured = process.env.EMAIL_USER && 
                             process.env.EMAIL_PASS && 
                             !process.env.EMAIL_USER.includes('your-');

    if (isEmailConfigured) {
      try {
        console.log("Attempting to send email...");
        const transporter = createTransporter();

        // Email to admin
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: "New Client Message",
          text: `
Name: ${name}
Email: ${email}
Project Category: ${projectCategory}
Message: ${message}
`
        });

        emailSent = true;
        console.log(`✓ Email sent successfully for: ${name}`);
      } catch (emailError) {
        console.error('Email sending error details:', emailError);
        // Continue even if email fails
      }
    } else {
      console.warn('⚠ Email service not configured. Configure EMAIL_USER and EMAIL_PASS in .env');
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        projectCategory: contact.projectCategory,
        createdAt: contact.createdAt
      },
      metadata: {
        databaseSaved: saved,
        emailSent: emailSent
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /api/contacts - Retrieve all contacts (admin endpoint)
export const getAllContacts = async (req, res) => {
  try {
    // TODO: Add authentication middleware for production
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ success: false, message: 'Unauthorized' });
    // }

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean(); // Use lean() for better performance

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /api/contacts/:id - Get single contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /api/contacts/stats - Get contact statistics
export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const contactsByCategory = await Contact.aggregate([
      {
        $group: {
          _id: '$projectCategory',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        totalContacts,
        byCategory: contactsByCategory,
        recent: recentContacts
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
