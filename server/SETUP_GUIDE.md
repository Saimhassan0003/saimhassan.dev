# Complete Backend Setup Guide

## Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (free)
- Gmail account with 2FA enabled

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Add Your Credentials

Edit `server/.env` and add:

**MongoDB URI:**
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Gmail Credentials:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### 4. Start the Server

```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════╗
║  Portfolio Backend Server Started  ║
╠════════════════════════════════════╣
║  Port: 5000                        ║
║  Environment: development          ║
║  Database: Connected               ║
╚════════════════════════════════════╝
```

---

## Detailed Setup Instructions

### Step 1: Create MongoDB Cluster

1. **Create Account**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Click "Create an account"
   - Use your email or Google account

2. **Create Cluster**
   - Click "Create a deployment"
   - Select **M0 Sandbox** (free tier)
   - Choose your preferred cloud provider (AWS recommended)
   - Select a region closest to you
   - Click "Create deployment"

3. **Create Database User**
   - Go to "Security" → "Database Access"
   - Click "Add Database User"
   - **Username:** Any username you choose (e.g., `portfolio-user`)
   - **Password:** Click "Auto-generate secure password" and save it
   - **Role:** `readWriteAnyDatabase`
   - Click "Create User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow from anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Select "Drivers" → "Node.js"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

6. **Update .env**
   - Replace `username` with your database user
   - Replace `password` with your generated password
   - Add to `.env`:
     ```env
     MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
     ```

✅ **MongoDB is now configured!**

---

### Step 2: Configure Gmail (Email Notifications)

#### Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Find "2-Step Verification"
3. Click "Get Started"
4. Follow the prompts to set up 2FA (phone verification)

#### Generate App Password

1. Go to [Gmail App Passwords](https://myaccount.google.com/apppasswords)
   - Note: This link only appears if 2FA is enabled
2. Select:
   - **Select app:** Mail
   - **Select device:** Windows Computer
3. Click "Generate"
4. Google will display a 16-character password
5. **Copy this password** - you'll only see it once!

#### Update .env

Add to `server/.env`:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your-gmail-address@gmail.com
```

Replace:
- `your-gmail-address@gmail.com` with your actual Gmail
- `xxxx xxxx xxxx xxxx` with the 16-character app password (keep spaces or remove them, both work)

✅ **Gmail is now configured!**

---

### Step 3: Install & Run Backend

```bash
# Navigate to server directory
cd server

# Install dependencies (if not done yet)
npm install

# Create .env from example
cp .env.example .env

# Edit .env with your MongoDB URI and Gmail credentials
# Then start the server
npm run dev
```

Expected output:
```
[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`

╔════════════════════════════════════╗
║  Portfolio Backend Server Started  ║
╠════════════════════════════════════╣
║  Port: 5000                        ║
║  Environment: development          ║
║  Database: Connected               ║
╚════════════════════════════════════╝
```

✅ **Backend is running!**

---

## Available Commands

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# View MongoDB connection status
curl http://localhost:5000/api/db-status

# Check server health
curl http://localhost:5000/api/health
```

---

## Testing the API

### Health Check

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "status": "✓ Backend is running",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "projectCategory": "Web Development",
    "message": "This is a test message with at least 10 characters"
  }'
```

### Get All Contacts

```bash
curl http://localhost:5000/api/contacts
```

### Get Contact Statistics

```bash
curl http://localhost:5000/api/contacts/stats
```

---

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection setup
├── controllers/
│   └── contactController.js # Business logic for contacts
├── models/
│   └── Contact.js           # MongoDB schema
├── routes/
│   └── contactRoutes.js     # API route definitions
├── index.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables (PRIVATE)
├── .env.example             # Example configuration
└── BACKEND_API.md           # API documentation
```

---

## Common Issues & Solutions

### MongoDB Connection Fails

**Error:** `MongoDB connection error: Authentication failed`

**Solutions:**
1. Verify username and password are correct in `.env`
2. Check username and password don't have special characters that need encoding
3. Ensure IP is whitelisted (Security → Network Access)
4. Try "Allow from anywhere" temporarily for testing

---

### Email Not Sending

**Error:** `Email sending error: 535 Invalid credentials`

**Solutions:**
1. Verify 2FA is enabled on Gmail account
2. Use App Password, NOT your regular Gmail password
3. Ensure EMAIL_PASS is exactly 16 characters
4. Try regenerating a new app password

**Gmail App Passwords:**
- Valid: `abcd efgh ijkl mnop` (16 chars, can include spaces)
- Invalid: Your regular Gmail password
- Invalid: Passwords with symbols `! @ # $ %` etc.

---

### Port Already in Use

**Error:** `Error: listen EADDRINUSE :::5000`

**Solution:**
```bash
# Kill process on port 5000
# Windows (PowerShell):
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Or change port in .env:
PORT=5001
```

---

### Nodemon Not Found

**Error:** `nodemon: command not found`

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or run directly
node index.js
```

---

## Environment Checklist

Before deploying, ensure:

- [ ] MongoDB cluster is active
- [ ] Database user credentials are correct
- [ ] IP is whitelisted in MongoDB Atlas
- [ ] Gmail has 2FA enabled
- [ ] Gmail app password is generated and working
- [ ] All values in `.env` are filled (not placeholders)
- [ ] `.env` file is in `.gitignore` (never commit it)
- [ ] Backend starts without errors: `npm run dev`
- [ ] API endpoints respond to health checks
- [ ] Contact form submission works end-to-end

---

## Frontend Integration

Your React contact form should send POST requests to:

```javascript
const response = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    projectCategory: formData.projectCategory,
    message: formData.message
  })
});

const data = await response.json();
```

---

## Production Deployment

### Recommended Platforms
- **Render.com** (free tier available)
- **Railway.app** (simple deployment)
- **Heroku** (requires paid tier now)
- **AWS** (more complex but powerful)

### Pre-deployment Checklist
- [ ] Add environment variables to hosting platform
- [ ] Update CORS origins for production URL
- [ ] Disable console.log in production
- [ ] Set `NODE_ENV=production`
- [ ] Add API rate limiting
- [ ] Add authentication for admin endpoints
- [ ] Enable HTTPS
- [ ] Test all endpoints on production

---

## Monitoring & Logs

### View Real-time Logs

The server prints logs to console:
- `✓` - Successful operations
- `✗` - Errors
- `⚠` - Warnings

### MongoDB Logs

View in MongoDB Atlas:
1. Go to Clusters → Logs
2. View database activity and errors
3. Monitor performance

### Email Logs

Gmail keeps logs of sent/received emails:
1. Go to [Gmail Settings](https://mail.google.com/mail/u/0/#settings/general)
2. Check "Display density" and "Conversation view" settings
3. All emails are searchable

---

## Support & Resources

- **MongoDB Documentation:** https://docs.mongodb.com/
- **Express.js Guide:** https://expressjs.com/
- **Nodemailer Setup:** https://nodemailer.com/
- **Gmail Security:** https://myaccount.google.com/security
- **Mongoose Docs:** https://mongoosejs.com/

---

## Next Steps

1. ✅ Backend is running
2. ✅ Database is connected
3. ✅ Email is configured
4. 🔄 Test with your React frontend
5. 🔄 Verify messages are saved in MongoDB
6. 🔄 Confirm emails are received
7. 📊 View admin dashboard at `/api/contacts`
8. 🚀 Deploy to production

---

**Happy coding!** 🚀
