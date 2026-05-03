# Email Setup Guide - Contact Form Notifications

## Kaise Kaam Karega?

Jab koi contact form submit karega:
1. ✅ Form data backend ko jaye
2. ✅ Database mein save ho (agar MongoDB configured hai)
3. ✅ **Tumhare email par notification email aaye** (is step ke liye Gmail setup zaroori hai)
4. ✅ User ko confirmation email jaye

---

## Gmail Setup - Step by Step

### Step 1: 2-Factor Authentication Enable Karo

1. Gmail account kholо: https://myaccount.google.com
2. "Security" tab par jao (left side)
3. **"2-Step Verification"** dhundho
4. Click karo: "2-Step Verification"
5. Apna phone number add karo
6. OTP verify karo
7. Complete karo

### Step 2: App Password Generate Karo

1. https://myaccount.google.com/apppasswords par jao
2. Select: **"Mail"** aur **"Windows Computer"**
3. **"Generate"** button click karo
4. 16-character password milega (copy kar lo!)

Example:
```
abcd efgh ijkl mnop
```

---

## Step 3: .env File Update Karo

File kholo: **F:\portfolio\portfolio\server\.env**

Replace karo:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

With (example):
```env
EMAIL_USER=saimhassantariq0003@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

⚠️ **Zaroori:** 
- Exactly apna Gmail daalo (jo Google account hai)
- 16-character app password theek tarah paste karo (spaces ke saath)

---

## Step 4: Backend Restart Karo

Terminal mein jahan backend chal raha hai:
```
rs
```

Ya manually:
```bash
cd F:\portfolio\portfolio\server
npm run dev
```

Backend logs mein dekhna:
```
✓ Server running on port 5000
```

---

## Step 5: Test Karo!

### Local Test:
1. Browser kholo: http://localhost:5174
2. Contact form bharo
3. Submit karo
4. Apne Gmail mein check karo (inbox ya spam folder mein)

### Kya Aaye?

**Email 1 - Tumhare Liye:**
```
Subject: New Portfolio Inquiry from [Name]
Body: 
- Name
- Email
- Project Type
- Budget
- Message
```

**Email 2 - User Ke Liye:**
```
Subject: Thanks for reaching out! - Saim Hassan
Body: Auto-reply thanking them
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Emails nahi aa rahe | 1. .env file check karo<br>2. App password sahi hai?<br>3. 2FA enabled hai?<br>4. Backend restart karo |
| "Invalid login" error | App password galat hai, dobara generate karo |
| Spam folder mein gaye | Gmail settings mein whitelist karo |
| Backend restart ke baad bhi kaam nahi kar raha | Terminal mein `rs` command press karo |

---

## Gmail Security Settings

Agar phir bhi problem aaye:

1. https://myaccount.google.com/security par jao
2. **"Less secure app access"** → Turn ON (optional)
3. Or **"App passwords"** use karo (recommended)

---

## Live Example

Jab email properly configured ho, ye flow hoga:

```
User fills form at localhost:5174
        ↓
Clicks "Send Message & Get Estimate"
        ↓
Data goes to backend (http://localhost:5000)
        ↓
✅ Email sent to: saimhassantariq0003@gmail.com
✅ Email sent to: user@example.com
✅ Data saved to MongoDB (agar configured hai)
        ↓
Form shows: "Message sent successfully!"
```

---

## Vercel Deploy Ke Time

Jab production mein deploy karo:
1. Vercel dashboard → Environment Variables
2. Add karo:
```
EMAIL_USER = your-gmail@gmail.com
EMAIL_PASS = your-app-password
MONGODB_URI = your-mongodb-uri
```

3. Redeploy karo

---

## Quick Commands

```bash
# Backend restart
cd F:\portfolio\portfolio\server
npm run dev

# Frontend test
http://localhost:5174

# Check backend status
http://localhost:5000/api/health

# Check email configuration
http://localhost:5000/api/db-status
```

---

## Next Steps

- [ ] 2FA enable kar
- [ ] App password generate kar
- [ ] .env mein paste kar
- [ ] Backend restart kar
- [ ] Form submit kar test ke liye
- [ ] Email check kar (inbox + spam)
