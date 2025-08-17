const mongoose = require('mongoose')

let connectionPromise = null

const connectDB = async (overrideUri) => {
  try {
    const mongoURI = overrideUri || process.env.MONGODB_URI || 'mongodb://localhost:27017/website-template'

    if (mongoose.connection.readyState === 1) {
      return mongoose.connection
    }

    if (connectionPromise) {
      return connectionPromise
    }

    mongoose.set('strictQuery', true)

    connectionPromise = mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    }).then((conn) => {
      console.log('✅ MongoDB connected successfully')

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err)
      })
      
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected')
      })
      
      process.on('SIGINT', async () => {
        await mongoose.connection.close()
        console.log('MongoDB connection closed through app termination')
        process.exit(0)
      })
      
      return conn
    }).catch((err) => {
      // Clear cached promise on failure so future attempts can retry
      connectionPromise = null
      throw err
    })

    return await connectionPromise
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    return null
  }
}

module.exports = { connectDB }
