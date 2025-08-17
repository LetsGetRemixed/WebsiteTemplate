Env setup:

//local backend

PORT=5000
NODE_ENV=development

//github secret
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:passwordQ@main.zwciuyi.mongodb.net/


# Firebase Configuration (for production)
FIREBASE_PROJECT_ID=websitetemplate-9999

JWT_SECRET=randomlettersandnumbers

Github Only:

FIREBASE_GIT_SECRET: "firebase login:ci"


FRONT: 

VITE_BACKEND_URL=http://localhost:5000/api

GITHUB:  

VITE_BACKEND_URL: https://us-central1-myproject-9999.cloudfunctions.net/api


Push to main!