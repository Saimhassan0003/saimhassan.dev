# Backend Integration Guide

Complete guide to integrating the contact form backend with your React frontend.

## Frontend Code Example

### Using Fetch API

```javascript
// components/Contact.jsx

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectCategory: 'Web Development',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success, error, or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to submit form',
          errors: data.errors
        });
        return;
      }

      setStatus({
        type: 'success',
        message: data.message
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        projectCategory: 'Web Development',
        message: ''
      });

    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Network error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Project Category *</label>
        <select
          id="category"
          name="projectCategory"
          value={formData.projectCategory}
          onChange={handleChange}
          required
        >
          <option value="Web Development">Web Development</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Design">Design</option>
          <option value="Consultation">Consultation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell me about your project..."
          rows="5"
        />
      </div>

      {status && (
        <div className={`status-message ${status.type}`}>
          <p>{status.message}</p>
          {status.errors && (
            <ul>
              {status.errors.map((err, idx) => (
                <li key={idx}>{err.field}: {err.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### Using Axios (Optional)

If you prefer axios, install it first:

```bash
npm install axios
```

Then use like this:

```javascript
import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:5000/api/contact', formData);
    setStatus({
      type: 'success',
      message: response.data.message
    });
    setFormData({ name: '', email: '', projectCategory: 'Web Development', message: '' });
  } catch (error) {
    setStatus({
      type: 'error',
      message: error.response?.data?.message || 'Error submitting form'
    });
  } finally {
    setLoading(false);
  }
};
```

---

## CSS Styling Example

```css
/* styles/contact.css */

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #0056b3;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-message ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}

.status-message li {
  margin: 0.25rem 0;
}
```

---

## Environment Setup for Frontend

If your frontend and backend are on different ports during development, make sure CORS is configured in the backend.

The backend already allows:
- `http://localhost:5173` (Vite default)
- `http://localhost:5174`
- `http://localhost:3000` (Create React App)
- `http://localhost:8000`

If using a different port, add it to `server/index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:YOUR_PORT',
    // ... other origins
  ]
}));
```

---

## Testing the Integration

### Step 1: Start Backend

```bash
cd server
npm run dev
```

Expected output:
```
✓ Server running on port 5000
```

### Step 2: Start Frontend

```bash
# In root directory
npm run dev
```

Expected output:
```
✓ Local: http://localhost:5173/
```

### Step 3: Test Form

1. Fill out contact form on frontend
2. Click "Send Message"
3. Check:
   - Success message appears
   - Emails received in Gmail
   - Message saved in MongoDB Atlas

### Step 4: Check Admin Panel

```bash
# View all submitted contacts
curl http://localhost:5000/api/contacts
```

---

## Handling Different Environments

### Development

```javascript
const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api'
  : process.env.REACT_APP_API_URL;
```

In `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production

Update when deploying:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

Use in component:

```javascript
const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
  // ...
});
```

---

## Response Handling Examples

### Success Response

```javascript
{
  "success": true,
  "message": "Thank you! Your message has been received...",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "projectCategory": "Web Development",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Validation Error Response

```javascript
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

### Server Error Response

```javascript
{
  "success": false,
  "message": "Error processing your message. Please try again later."
}
```

---

## Best Practices

### 1. Validate on Frontend First

```javascript
// Basic validation before sending
if (formData.name.length < 2) {
  setError('Name must be at least 2 characters');
  return;
}

if (!formData.email.includes('@')) {
  setError('Invalid email format');
  return;
}

if (formData.message.length < 10) {
  setError('Message must be at least 10 characters');
  return;
}
```

### 2. Show Loading State

```javascript
<button disabled={loading}>
  {loading ? (
    <>
      <span className="spinner"></span>
      Sending...
    </>
  ) : (
    'Send Message'
  )}
</button>
```

### 3. Handle Network Errors

```javascript
try {
  // ...
} catch (error) {
  if (!navigator.onLine) {
    setError('No internet connection');
  } else if (error.code === 'ECONNABORTED') {
    setError('Request timeout - please try again');
  } else {
    setError('Failed to send message - please try again');
  }
}
```

### 4. Rate Limiting (Client-side)

```javascript
const [lastSubmitTime, setLastSubmitTime] = useState(0);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Prevent rapid submissions
  if (Date.now() - lastSubmitTime < 3000) {
    setError('Please wait before submitting again');
    return;
  }

  setLastSubmitTime(Date.now());
  // ... rest of submit logic
};
```

---

## Troubleshooting Integration

### CORS Error

**Error:** `Access to XMLHttpRequest... has been blocked by CORS policy`

**Solution:** Backend CORS is not allowing frontend URL. Check that frontend port is in the CORS whitelist in `server/index.js`.

### 404 Not Found

**Error:** `POST http://localhost:5000/api/contact 404`

**Solution:** Backend not running or route not defined. Check:
1. Backend is running: `npm run dev`
2. Route path is correct: `/api/contact`

### Timeout

**Error:** `Failed to fetch - network error`

**Solution:** 
1. Verify backend is running
2. Verify URL is correct
3. Add timeout handling

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);

try {
  const response = await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timeoutId);
}
```

### Email Not Received

**Check:**
1. Backend logs show email was sent
2. Check spam/promotions folder in Gmail
3. Verify ADMIN_EMAIL in .env is correct
4. Verify EMAIL_PASS is app password, not regular password

---

## Complete Component Example

```javascript
// components/Contact.jsx
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectCategory: 'Web Development',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL || 'http://localhost:5000/api/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setStatus({ type: 'success', message: data.message });
      setFormData({
        name: '',
        email: '',
        projectCategory: 'Web Development',
        message: ''
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <select
        name="projectCategory"
        value={formData.projectCategory}
        onChange={handleChange}
        required
      >
        <option value="Web Development">Web Development</option>
        <option value="Mobile App">Mobile App</option>
        <option value="Design">Design</option>
        <option value="Consultation">Consultation</option>
        <option value="Other">Other</option>
      </select>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      {status && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Documentation Links

- [BACKEND_API.md](./BACKEND_API.md) - Complete API reference
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Backend setup instructions
- [README.md](./README.md) - Quick reference
- [.env.example](./.env.example) - Environment variables

---

**Integration complete! Your contact form is now fully functional.** 🎉
