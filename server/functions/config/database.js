const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/website-template'
    if (mongoose.connection.readyState === 1) {
      return
    }
    await mongoose.connect(mongoURI)
    console.log('✅ [Functions] MongoDB connected')
    mongoose.connection.on('error', (err) => {
      console.error('[Functions] MongoDB connection error:', err)
    })
    mongoose.connection.on('disconnected', () => {
      console.log('[Functions] MongoDB disconnected')
    })
  } catch (error) {
    console.error('❌ [Functions] MongoDB connection failed:', error.message)
  }
}

module.exports = { connectDB }


