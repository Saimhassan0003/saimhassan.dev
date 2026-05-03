# Backend API Documentation

## Overview

Complete RESTful API for portfolio contact form with MongoDB persistence and Gmail email notifications.

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Submit Contact Form

**POST** `/contact`

Submit a new contact form message.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "projectCategory": "Web Development",
  "message": "I'm interested in building a new website for my business."
}
```

#### Request Fields

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `name` | String | ✓ | Min 2 characters |
| `email` | String | ✓ | Valid email format |
| `projectCategory` | String | ✓ | One of: Web Development, Mobile App, Design, Consultation, Other |
| `message` | String | ✓ | Min 10, Max 5000 characters |

#### Success Response (201)
```json
{
  "success": true,
  "message": "Thank you! Your message has been received. I will get back to you soon.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "projectCategory": "Web Development",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "metadata": {
    "databaseSaved": true,
    "emailSent": true
  }
}
```

#### Error Response (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

#### Automatic Actions
- ✅ Saves message to MongoDB
- ✅ Sends email notification to admin
- ✅ Sends confirmation email to user

---

### 2. Get All Contacts

**GET** `/contacts`

Retrieve all submitted contact messages (admin endpoint).

#### Response (200)
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "projectCategory": "Web Development",
      "message": "I'm interested in...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Parameters
- **Limit**: 100 most recent contacts
- **Sort**: By date (newest first)

---

### 3. Get Contact Statistics

**GET** `/contacts/stats`

Get aggregated contact statistics.

#### Response (200)
```json
{
  "success": true,
  "data": {
    "totalContacts": 15,
    "byCategory": [
      { "_id": "Web Development", "count": 8 },
      { "_id": "Mobile App", "count": 4 },
      { "_id": "Design", "count": 2 },
      { "_id": "Other", "count": 1 }
    ],
    "recent": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "projectCategory": "Web Development",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

### 4. Get Single Contact

**GET** `/contacts/:id`

Retrieve a specific contact by MongoDB ID.

#### URL Parameters
- `id` (String): MongoDB ObjectId

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "projectCategory": "Web Development",
    "message": "I'm interested in...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Error Response (404)
```json
{
  "success": false,
  "message": "Contact not found"
}
```

---

## Health Check Endpoints

### Server Health

**GET** `/health`

Check if server is running.

#### Response
```json
{
  "success": true,
  "status": "✓ Backend is running",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Database Status

**GET** `/db-status`

Detailed MongoDB connection diagnostics.

#### Response
```json
{
  "mongodbStatus": "connected",
  "database": "portfolio",
  "host": "cluster0.mongodb.net",
  "hasUri": true,
  "isPlaceholder": false
}
```

---

## Error Handling

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation failed |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

---

## CORS Configuration

The backend accepts requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174`
- `http://localhost:3000`
- `http://localhost:8000`
- `http://127.0.0.1:5173`
- `https://saimhassan-dev.vercel.app`
- `https://saimhassan.dev`

---

## Authentication & Security

⚠️ **TODO for Production:**
- Add JWT authentication for admin endpoints
- Implement rate limiting
- Add CSRF protection
- Validate and sanitize all inputs
- Add logging middleware
- Use HTTPS only

---

## Database Schema

### Contact Model
```javascript
{
  name: String (required, min: 2 chars)
  email: String (required, valid email)
  projectCategory: String (required, enum)
  message: String (required, min: 10, max: 5000 chars)
  createdAt: Date (default: now, indexed)
}
```

---

## Email Templates

### Admin Notification Email
- **To**: ADMIN_EMAIL
- **Subject**: `New Client Message from [Name]`
- **Contains**: Name, Email, Category, Message, Timestamp
- **Format**: Professional HTML template

### User Confirmation Email
- **To**: User's email
- **Subject**: `Thanks for reaching out! - Saim Hassan`
- **Contains**: Confirmation message, category info, expected response time

---

## Usage Examples

### JavaScript/Fetch

```javascript
// Submit contact form
const submitContact = async () => {
  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      projectCategory: 'Web Development',
      message: 'I would like to discuss a web development project.'
    })
  });

  const data = await response.json();
  console.log(data);
};

// Get all contacts
const getContacts = async () => {
  const response = await fetch('http://localhost:5000/api/contacts');
  const data = await response.json();
  console.log(data);
};
```

### React (with hooks)

```javascript
import { useState } from 'react';

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          projectCategory: e.target.category.value,
          message: e.target.message.value
        })
      });

      if (!response.ok) throw new Error('Failed to submit');
      const data = await response.json();
      console.log('Success:', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
    </form>
  );
}
```

---

## Environment Variables

Required `.env` variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
```

See `.env.example` for detailed setup instructions.

---

## Troubleshooting

### MongoDB Connection Fails
1. Check connection string in `.env`
2. Verify IP is whitelisted in MongoDB Atlas
3. Ensure credentials are correct
4. Verify database cluster is active

### Email Not Sending
1. Verify Gmail credentials are correct
2. Check if 2FA is enabled on Gmail account
3. Verify app password (not regular password) is used
4. Check EMAIL_PASS format (16 characters without spaces)

### CORS Errors
1. Ensure frontend URL is in CORS whitelist
2. Check browser console for specific error
3. Verify request headers and method

---

## Support

For issues or questions:
- Check MongoDB Atlas documentation
- Review Gmail App Password setup
- Check .env configuration
- Review browser console and server logs
