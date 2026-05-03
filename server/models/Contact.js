import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  projectCategory: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['Web Development', 'Mobile App', 'Design', 'Consultation', 'Other'],
    default: 'Other'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
