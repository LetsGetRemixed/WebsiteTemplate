# Quick Start Guide

Get your website template running in 5 minutes! 🚀

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git
- Firebase CLI (for deployment) - `npm install -g firebase-tools`

## Step 1: Install Dependencies

```bash
npm run install:all
```

## Step 2: Set Up Environment Variables

```bash
cp env.example .env
```

Edit `.env` with your configuration:

### Required Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/website-template

# JWT Configuration (REQUIRED for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
```

### Optional Environment Variables

```env
# Email Configuration (for password reset, etc.)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# Firebase Configuration (for production deployment)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# MongoDB Atlas (for production)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/website-template?retryWrites=true&w=majority

# Redis (for caching and sessions)
# REDIS_URL=redis://localhost:6379

# AWS S3 (for file storage)
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_REGION=us-east-1
# AWS_BUCKET_NAME=your-bucket-name
```

## Step 3: Seed the Database

```bash
npm run seed
```

This adds sample words to test the backend connection.

## Step 4: Start Development

```bash
npm run dev
```

## Step 5: Test Your Template

1. Open `http://localhost:3000`
2. You should see "Hello" with a random word from the backend
3. Test the API at `http://localhost:5000/api/health`
4. Test authentication at `http://localhost:3000/login`

## 🎉 You're Done!

Your website template is now running with:
- ✅ React frontend with Tailwind CSS v4
- ✅ Backend API with MongoDB
- ✅ JWT Authentication
- ✅ Hot reload development
- ✅ Sample data

## Firebase Deployment Setup

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Project

```bash
npm run firebase:init
```

Or manually:
```bash
firebase init
```

Select the following options:
- **Hosting**: Configure files for Firebase Hosting
- **Functions**: Configure a Cloud Functions directory and its files
- **Firestore**: Configure security rules and indexes for Firestore
- **Storage**: Configure a security rules file for Cloud Storage

### Step 4: Configure Firebase Project

1. **Hosting Configuration**:
   - Public directory: `client/dist`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

2. **Functions Configuration**:
   - Language: `JavaScript`
   - ESLint: `Yes`
   - Install dependencies: `Yes`

3. **Firestore Configuration**:
   - Rules file: `firestore.rules`
   - Indexes file: `firestore.indexes.json`

### Step 5: Set Up Firebase Environment Variables

For production deployment, add these to your Firebase project:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate a new private key
3. Add the following environment variables to your Firebase Functions:

```bash
firebase functions:config:set \
  mongodb.uri="your-mongodb-atlas-uri" \
  jwt.secret="your-jwt-secret" \
  jwt.expire="30d"
```

### Step 6: Deploy to Firebase

```bash
npm run firebase:deploy
```

Or manually:
```bash
# Build the client
npm run build

# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

## Environment Variables Reference

### Development vs Production

| Variable | Development | Production | Required |
|----------|-------------|------------|----------|
| `PORT` | 5000 | Auto-assigned | No |
| `NODE_ENV` | development | production | Yes |
| `MONGODB_URI` | localhost | Atlas URI | Yes |
| `JWT_SECRET` | any string | strong secret | Yes |
| `JWT_EXPIRE` | 30d | 30d | No |
| `FIREBASE_PROJECT_ID` | - | your-project-id | For Firebase |
| `FIREBASE_PRIVATE_KEY` | - | service-account-key | For Firebase |
| `FIREBASE_CLIENT_EMAIL` | - | service-account-email | For Firebase |

### Security Best Practices

1. **Never commit `.env` files** - they're already in `.gitignore`
2. **Use strong JWT secrets** - generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
3. **Use environment-specific databases** - local for dev, Atlas for production
4. **Rotate secrets regularly** - especially in production
5. **Use Firebase service accounts** - not personal accounts for deployment

## Troubleshooting

### MongoDB Connection Issues

**Local MongoDB:**
```bash
# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (macOS/Linux)
sudo systemctl start mongod
```

**MongoDB Atlas:**
1. Create cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string from "Connect" button
3. Replace `username`, `password`, and `cluster` in the URI

### Port Already in Use

```bash
# Check what's using the port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Change ports in .env and vite.config.js
PORT=5001  # .env
port: 3001  # vite.config.js
```

### Firebase Deployment Issues

1. **Authentication Error:**
   ```bash
   firebase logout
   firebase login
   ```

2. **Build Error:**
   ```bash
   # Clear cache and rebuild
   rm -rf client/dist
   npm run build
   ```

3. **Functions Error:**
   ```bash
   # Check functions logs
   firebase functions:log
   ```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm run install:all
```

## Next Steps

- Customize the React components in `client/src/components/`
- Add new API endpoints in `server/controllers/`
- Set up CI/CD with GitHub Actions (see `.github/workflows/`)
- Configure custom domain in Firebase Console
- Set up monitoring and analytics

---

Need help? Check the main [README.md](README.md) for detailed documentation!
