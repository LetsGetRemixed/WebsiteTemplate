import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Word from '../models/Word.js'

dotenv.config()

const sampleWords = [
  { word: 'awesome', category: 'adjective', definition: 'Extremely impressive or daunting' },
  { word: 'brilliant', category: 'adjective', definition: 'Exceptionally clever or talented' },
  { word: 'courage', category: 'noun', definition: 'The ability to do something that frightens one' },
  { word: 'determination', category: 'noun', definition: 'Firmness of purpose; resoluteness' },
  { word: 'excellent', category: 'adjective', definition: 'Extremely good; outstanding' },
  { word: 'fantastic', category: 'adjective', definition: 'Extraordinarily good or attractive' },
  { word: 'gratitude', category: 'noun', definition: 'The quality of being thankful' },
  { word: 'happiness', category: 'noun', definition: 'The state of being happy' },
  { word: 'inspiration', category: 'noun', definition: 'The process of being mentally stimulated' },
  { word: 'joyful', category: 'adjective', definition: 'Feeling, expressing, or causing great pleasure' },
  { word: 'kindness', category: 'noun', definition: 'The quality of being friendly, generous, and considerate' },
  { word: 'laughter', category: 'noun', definition: 'The action or sound of laughing' },
  { word: 'magnificent', category: 'adjective', definition: 'Extremely beautiful, elaborate, or impressive' },
  { word: 'nurture', category: 'verb', definition: 'Care for and encourage the growth or development of' },
  { word: 'optimism', category: 'noun', definition: 'Hopefulness and confidence about the future' },
  { word: 'peaceful', category: 'adjective', definition: 'Free from disturbance; tranquil' },
  { word: 'quality', category: 'noun', definition: 'The standard of something as measured against other things' },
  { word: 'resilient', category: 'adjective', definition: 'Able to withstand or recover quickly from difficulties' },
  { word: 'success', category: 'noun', definition: 'The accomplishment of an aim or purpose' },
  { word: 'triumph', category: 'noun', definition: 'A great victory or achievement' },
  { word: 'unique', category: 'adjective', definition: 'Being the only one of its kind' },
  { word: 'valuable', category: 'adjective', definition: 'Worth a great deal of money' },
  { word: 'wonderful', category: 'adjective', definition: 'Inspiring delight, pleasure, or admiration' },
  { word: 'excellent', category: 'adjective', definition: 'Extremely good; outstanding' },
  { word: 'yearning', category: 'noun', definition: 'A feeling of intense longing for something' },
  { word: 'zealous', category: 'adjective', definition: 'Having or showing zeal; passionate' }
]

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/website-template'
    
    await mongoose.connect(mongoURI)
    
    console.log('✅ Connected to MongoDB')
    
    // Clear existing data
    await Word.deleteMany({})
    console.log('🗑️  Cleared existing words')
    
    // Insert sample words
    const insertedWords = await Word.insertMany(sampleWords)
    console.log(`✅ Inserted ${insertedWords.length} words into database`)
    
    // Display some sample words
    console.log('\n📝 Sample words added:')
    insertedWords.slice(0, 5).forEach(word => {
      console.log(`  - ${word.word} (${word.category})`)
    })
    
    console.log('\n🎉 Database seeded successfully!')
    console.log('🚀 You can now test the API endpoints:')
    console.log('   GET /api/words/random - Get a random word')
    console.log('   GET /api/words - Get all words')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
