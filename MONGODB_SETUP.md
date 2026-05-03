# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://account.mongodb.com/account/register
2. Sign up (free tier available)
3. Create organization & project

## Step 2: Create a Cluster
1. Click "Create Cluster"
2. Choose **M0 Sandbox** (FREE) tier
3. Select your region (closest to you)
4. Click "Create Cluster" (takes 2-3 minutes)

## Step 3: Create Database User
1. Go to "Database Access" in sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. **Username:** `portfolio_user` (or your choice)
5. **Password:** Generate secure password (copy it!)
6. Database User Privileges: "Atlas Admin"
7. Click "Add User"

## Step 4: Whitelist Your IP
1. Go to "Network Access" in sidebar
2. Click "Add IP Address"
3. Choose "Add Current IP Address" (auto-detects)
4. OR enter `0.0.0.0/0` for anywhere (⚠️ less secure for production)
5. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Clusters"
2. Click "Connect" button
3. Choose "Connect Your Application"
4. Select "Node.js" and "4.x or later"
5. Copy the connection string (looks like):
```
mongodb+srv://portfolio_user:PASSWORD@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Step 6: Update .env File
Replace the connection string in `server/.env`:
```env
MONGODB_URI=mongodb+srv://portfolio_user:your-password-here@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

⚠️ **Important:** Replace:
- `portfolio_user` with YOUR username
- `your-password-here` with YOUR password
- `cluster0.xxxxx` with YOUR cluster info

## Step 7: Restart Backend
```bash
cd server
npm run dev
```

You should see:
```
✓ Server running on port 5000
✓ MongoDB connected successfully
```

## Step 8: Check in MongoDB Compass

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Open MongoDB Compass
3. Paste your connection string: `mongodb+srv://portfolio_user:password@...`
4. Click "Connect"
5. Go to "Databases" tab
6. Submit the contact form from http://localhost:5174
7. Refresh Compass
8. You should see `portfolio` database with `contacts` collection

## Troubleshooting

### Still not connecting?

**Check backend logs:**
```bash
cd server && npm run dev
```
Look for error messages.

**Test connection endpoint:**
```
http://localhost:5000/api/db-status
```
Should return:
```json
{
  "mongodbStatus": "connected",
  "database": "portfolio",
  "host": "cluster0.xxxxx.mongodb.net"
}
```

**Common issues:**

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED` | IP not whitelisted - add to "Network Access" |
| `authentication failed` | Wrong username/password |
| `querySrv failed` | Invalid connection string format |
| Database empty in Compass | Submit contact form first to create it |

### IP Whitelist
If connecting from different network, update in MongoDB Atlas:
1. Network Access → Add IP Address → Add Current IP Address
2. Choose "Allow access from anywhere" (temporary for development)

## Next Steps
✓ Backend connected to MongoDB
✓ Submit form and verify data in Compass
✓ Deploy to production with credentials in Vercel

## Alternative: Local MongoDB
If you prefer local development without cloud:
1. Install MongoDB Community: https://docs.mongodb.com/manual/installation/
2. Run: `mongod`
3. Change MONGODB_URI to: `mongodb://localhost:27017/portfolio`
