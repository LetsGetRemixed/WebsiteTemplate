const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/website-template'
    
    await mongoose.connect(mongoURI)
    
    console.log('✅ MongoDB connected successfully')
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('MongoDB connection closed through app termination')
      process.exit(0)
    })
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    // Don't exit the process; allow the HTTP server to start so the client proxy doesn't get ECONNREFUSED
    // You can retry connecting later or fix your MONGODB_URI
    return
  }
}

module.exports = { connectDB }
