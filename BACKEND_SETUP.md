# Portfolio Backend & Database Setup Guide

## Overview
This portfolio now has a full backend with MongoDB database for handling contact form submissions.

## Tech Stack
- **Backend:** Node.js + Express
- **Database:** MongoDB (Atlas)
- **Email:** Nodemailer (Gmail)
- **Deployment:** Vercel (Backend) + Vercel (Frontend)

## Setup Instructions

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and new cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
4. Copy it to `server/.env` as `MONGODB_URI`

### 2. Gmail Setup (for email notifications)
1. Enable 2-factor authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an "App Password" for "Mail"
4. In `server/.env`:
   - `EMAIL_USER=your-gmail@gmail.com`
   - `EMAIL_PASS=your-16-char-app-password`

### 3. Local Development

**Frontend:**
```bash
cd portfolio
npm install
npm run dev
# Runs on http://localhost:5173
```

**Backend (in another terminal):**
```bash
cd server
npm install
npm run dev
# Runs on http://localhost:5000
```

The contact form will now:
- Send data to your MongoDB database
- Email you each submission
- Send a confirmation email to the user

### 4. Files Structure
```
portfolio/
├── src/
│   ├── components/
│   │   └── Contact.jsx (updated with backend API)
│   └── ...
├── server/
│   ├── index.js (Express backend)
│   ├── package.json
│   └── .env (local - not in git)
├── .env.example (frontend env template)
└── ...
```

### 5. Vercel Deployment

**For Backend (Separate Deployment Recommended):**
1. Deploy `server/` folder to Railway.app, Heroku, or Render
2. Or use Vercel with serverless functions approach

**Alternative: All-in-one with Vercel:**
1. Create `vercel.json` at root with API routing
2. Set environment variables in Vercel dashboard
3. Update `VITE_API_URL` in frontend to point to deployed backend

### 6. Environment Variables Needed

**Frontend (.env.local or Vercel)**
```
VITE_API_URL=https://your-backend-url.vercel.app
```

**Backend (server/.env or Vercel)**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
```

### 7. Testing Contact Form
1. Fill and submit the contact form on localhost:5173
2. Check MongoDB Atlas for the saved entry
3. Check both your inbox and the form submitter's inbox for confirmation emails

## Features Included
✓ Contact form validation (backend)
✓ MongoDB storage of all submissions
✓ Email notifications to you
✓ Auto-reply emails to users
✓ CORS enabled for frontend
✓ Error handling & logging

## Next Steps
- [ ] Set up MongoDB Atlas account
- [ ] Configure email credentials
- [ ] Test locally
- [ ] Deploy backend to Railway/Render/Vercel
- [ ] Update frontend API URL
- [ ] Deploy frontend to Vercel
- [ ] Test live form submissions

## Support
For issues, check:
- `server/` logs for backend errors
- Browser console for frontend errors
- MongoDB Atlas logs for database issues
