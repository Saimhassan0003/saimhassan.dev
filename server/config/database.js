import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠ MONGODB_URI not configured. Database features disabled.');
      console.warn('  Add MONGODB_URI to your .env file');
      return false;
    }

    if (process.env.MONGODB_URI.includes('username:password')) {
      console.warn('⚠ MONGODB_URI contains placeholder values');
      console.warn('  Replace "username:password" with your actual credentials');
      return false;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✓ MongoDB connected successfully');
    return true;

  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    console.error('\n  Troubleshooting:');
    console.error('  1. Check your connection string in .env');
    console.error('  2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.error('  3. Verify database name in the connection string');
    console.error('  4. Check if MongoDB cluster is active\n');
    return false;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error.message);
  }
};
