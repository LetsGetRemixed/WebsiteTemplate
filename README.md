# Website Template

A modern, full-stack website template built with **React**, **Tailwind CSS v4**, **Node.js/Express**, **MongoDB**, and **Firebase** deployment ready.

## 🚀 Features

### Frontend
- **React 18** with modern hooks and functional components
- **Tailwind CSS v4** using `@import "tailwindcss"` and `@theme` approach
- **React Router** for navigation and routing
- **Context API** for state management
- **Protected Routes** with authentication
- **Modern UI Components** with Headless UI and Heroicons
- **Responsive Design** mobile-first approach
- **Error Boundaries** for graceful error handling
- **Loading States** and user feedback

### Backend
- **Node.js/Express** server with MVC architecture
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with secure token management
- **Rate Limiting** for API protection
- **Error Handling** with comprehensive error middleware
- **Input Validation** and sanitization
- **Security Headers** with Helmet
- **Request Logging** with Morgan

### Development & Testing
- **ESLint & Prettier** for code quality
- **Jest & React Testing Library** for testing
- **Hot Reload** with Vite
- **TypeScript Ready** configuration
- **GitHub Actions** CI/CD workflows
- **Docker Support** (ready for containerization)

### Deployment
- **Firebase Hosting** for frontend
- **Firebase Functions** for backend
- **Environment Management** with dotenv
- **Production Optimizations**
- **CDN Integration** ready

## 📁 Project Structure

```
WebsiteTemplate/
├── client/                 # Frontend (React + Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # App initialization
│   ├── index.html         # Main HTML file
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                 # Backend (Node.js/Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   │   ├── Word.js
│   │   └── User.js
│   ├── routes/            # API routes
│   │   ├── wordRoutes.js
│   │   └── authRoutes.js
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimit.js
│   ├── scripts/           # Database seeding
│   ├── functions/         # Firebase Functions
│   └── index.js           # Server entry point
├── .github/               # GitHub Actions workflows
│   └── workflows/
│       ├── merge.yml
│       └── pull-request.yml
├── firebase.json          # Firebase configuration
├── firestore.rules        # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── package.json           # Root dependencies
├── jest.config.js         # Jest configuration
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
└── README.md             # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WebsiteTemplate
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up MongoDB**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)
   - Update `MONGODB_URI` in `.env`

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

## 🚀 Development

### Start Development Server
```bash
npm run dev
```
This starts both frontend (port 3000) and backend (port 5000) with hot reload.

### Start Only Backend
```bash
npm run server:dev
```

### Start Only Frontend
```bash
npm run client:dev
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Words API
- `GET /api/words/random` - Get a random word
- `GET /api/words` - Get all words (with pagination)
- `GET /api/words/:id` - Get word by ID
- `POST /api/words` - Create a new word (protected)
- `PUT /api/words/:id` - Update a word (protected)
- `DELETE /api/words/:id` - Delete a word (protected)

### Health Check
- `GET /api/health` - Server health status

## 🎨 Frontend Features

- **Modern UI**: Clean, responsive design with Tailwind CSS v4
- **Component-based**: Modular React components with hooks
- **Authentication**: Complete login/logout functionality
- **Protected Routes**: Secure access to dashboard
- **Error Handling**: Graceful error states and boundaries
- **Loading States**: User-friendly loading indicators
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Mobile-first approach

## 🔧 Backend Features

- **MVC Architecture**: Models, Views (API), Controllers
- **MongoDB Integration**: Mongoose ODM with proper schemas
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API protection against abuse
- **Error Handling**: Comprehensive error middleware
- **Security**: Helmet, CORS, input validation
- **Logging**: Morgan HTTP request logging
- **Validation**: Input sanitization and validation

## 🚀 Deployment

### Firebase Deployment

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (first time only)
   ```bash
   firebase init
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### Environment Variables for Production

Set these in Firebase Functions environment:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: `production`

## 📝 Customization

### Adding New Models
1. Create a new model in `server/models/`
2. Create a controller in `server/controllers/`
3. Create routes in `server/routes/`
4. Add the routes to `server/index.js`

### Styling
- Modify Tailwind configuration in `client/index.html`
- Use `@theme` directives for custom CSS variables
- Add custom React components in `client/src/components/`

### Database
- Update schemas in `server/models/`
- Add new seed data in `server/scripts/seedData.js`
- Modify database connection in `server/config/database.js`

## 🔍 Testing the Template

1. Start the development server: `npm run dev`
2. Open `http://localhost:3000`
3. You should see the homepage with navigation
4. Test authentication by clicking "Login"
5. Test API endpoints at `http://localhost:5000/api/health`

## 📚 Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Headless UI**: Unstyled, accessible UI components
- **Heroicons**: Beautiful SVG icons

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

### Development & Testing
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Nodemon**: Development server

### Deployment
- **Firebase Hosting**: Static hosting
- **Firebase Functions**: Serverless functions
- **GitHub Actions**: CI/CD pipelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify MongoDB connection
3. Ensure all environment variables are set
4. Check Firebase configuration
5. Review the documentation

---

**Happy coding! 🎉**
