# Backend Quick Reference

## 🚀 Quick Start

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

**Server runs on:** `http://localhost:5000`

---

## 📁 File Structure

| File | Purpose |
|------|---------|
| `index.js` | Main server entry point |
| `models/Contact.js` | MongoDB schema definition |
| `controllers/contactController.js` | Business logic |
| `routes/contactRoutes.js` | API endpoint handlers |
| `config/database.js` | Database connection |
| `.env` | Credentials (PRIVATE - never commit) |
| `.env.example` | Template for .env |

---

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/stats` | Get statistics |
| GET | `/api/contacts/:id` | Get single contact |
| GET | `/api/health` | Server health check |
| GET | `/api/db-status` | Database status |

---

## 📨 Email System

### What Emails Are Sent?

1. **Admin Notification** → `ADMIN_EMAIL`
   - Notifies you of new contact
   - Includes all form data
   - Formatted professionally

2. **User Confirmation** → User's email
   - Thanks them for contacting
   - Sets expectations
   - Professional branding

### Email Configuration

```env
EMAIL_USER=your-gmail@gmail.com      # Sending account
EMAIL_PASS=xxxx xxxx xxxx xxxx       # 16-char app password
ADMIN_EMAIL=admin@example.com        # Where to send notifications
```

---

## 🗄️ MongoDB Schema

```javascript
Contact {
  name: String (required, min 2 chars)
  email: String (required, valid email)
  projectCategory: String (enum, required)
  message: String (required, 10-5000 chars)
  createdAt: Date (auto-indexed)
}
```

### Project Categories
- `Web Development`
- `Mobile App`
- `Design`
- `Consultation`
- `Other`

---

## 🧪 Test API Locally

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Submit Contact
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "projectCategory": "Web Development",
    "message": "I am interested in your services"
  }'
```

### 3. Get All Contacts
```bash
curl http://localhost:5000/api/contacts
```

### 4. Get Statistics
```bash
curl http://localhost:5000/api/contacts/stats
```

---

## 🔐 Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `PORT` | No | `5000` |
| `NODE_ENV` | No | `development` |
| `MONGODB_URI` | Yes* | `mongodb+srv://...` |
| `EMAIL_USER` | Yes* | `email@gmail.com` |
| `EMAIL_PASS` | Yes* | `xxxx xxxx xxxx xxxx` |
| `ADMIN_EMAIL` | No | `admin@example.com` |

*Required for full functionality (database & email)

---

## ⚙️ Available Commands

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Install dependencies
npm install

# Update dependencies
npm update
```

---

## 🐛 Common Errors

| Error | Solution |
|-------|----------|
| MongoDB connection fails | Check .env credentials, whitelist IP |
| Email not sending | Enable Gmail 2FA, use app password |
| CORS error | Check frontend URL in server.js |
| Port 5000 in use | Change PORT in .env or kill process |
| Nodemon not found | Run `npm install` |

---

## 📊 Monitoring

### Check Database Connection
```bash
curl http://localhost:5000/api/db-status
```

Response shows:
- MongoDB status (connected/disconnected)
- Database name
- Server host
- Credentials validation

### View Server Logs

Logs appear in terminal where `npm run dev` runs:
```
✓ Contact saved: John Doe (john@example.com)
✓ Emails sent successfully for: John Doe
✓ MongoDB connected successfully
```

---

## 🔄 Data Flow

```
User fills form
    ↓
Frontend sends POST /api/contact
    ↓
Server validates data
    ↓
Save to MongoDB
    ↓
Send email notifications
    ↓
Return success response
    ↓
Frontend shows confirmation message
```

---

## 🚀 Deployment Checklist

- [ ] All `.env` variables configured
- [ ] MongoDB Atlas cluster is active
- [ ] Gmail 2FA enabled and app password created
- [ ] CORS origins updated for production domain
- [ ] `NODE_ENV` set to `production`
- [ ] Logging configured
- [ ] Rate limiting added (optional)
- [ ] API tested end-to-end
- [ ] Email sending verified
- [ ] Database is backed up

---

## 📖 Documentation Files

- **BACKEND_API.md** - Complete API reference
- **SETUP_GUIDE.md** - Detailed setup instructions
- **.env.example** - Environment variables template
- **README.md** (this file) - Quick reference

---

## 🆘 Support Resources

- MongoDB: https://docs.mongodb.com
- Express: https://expressjs.com
- Nodemailer: https://nodemailer.com
- Mongoose: https://mongoosejs.com

---

## 🎯 Next Steps

1. **Configure MongoDB**
   - Create cluster at mongodb.com
   - Get connection string
   - Add to .env

2. **Configure Gmail**
   - Enable 2FA
   - Create app password
   - Add to .env

3. **Test Backend**
   - Run `npm run dev`
   - Test endpoints with curl
   - Check database

4. **Integrate Frontend**
   - Connect React form
   - Test full flow
   - Handle responses

5. **Deploy**
   - Choose hosting
   - Set environment variables
   - Deploy backend
   - Update frontend API URL

---

**Everything is set up and ready to go!** 🎉
