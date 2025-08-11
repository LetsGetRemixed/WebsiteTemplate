import Word from '../models/Word.js'

// Get a random word
export const getRandomWord = async (req, res) => {
  try {
    const word = await Word.getRandomWord()
    
    if (!word) {
      return res.status(404).json({ 
        error: 'No words found in database',
        message: 'Please add some words to the database first'
      })
    }
    
    res.json({ 
      word: word.word,
      category: word.category,
      definition: word.definition
    })
  } catch (error) {
    console.error('Error getting random word:', error)
    res.status(500).json({ 
      error: 'Failed to get random word',
      message: error.message 
    })
  }
}

// Get all words
export const getAllWords = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query
    
    const query = {}
    if (category) {
      query.category = category
    }
    
    const words = await Word.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec()
    
    const count = await Word.countDocuments(query)
    
    res.json({
      words: words.map(word => word.getInfo()),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalWords: count
    })
  } catch (error) {
    console.error('Error getting all words:', error)
    res.status(500).json({ 
      error: 'Failed to get words',
      message: error.message 
    })
  }
}

// Get word by ID
export const getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id)
    
    if (!word) {
      return res.status(404).json({ 
        error: 'Word not found',
        message: 'No word found with the provided ID'
      })
    }
    
    res.json(word.getInfo())
  } catch (error) {
    console.error('Error getting word by ID:', error)
    res.status(500).json({ 
      error: 'Failed to get word',
      message: error.message 
    })
  }
}

// Create a new word
export const createWord = async (req, res) => {
  try {
    const { word, category, definition } = req.body
    
    if (!word) {
      return res.status(400).json({ 
        error: 'Word is required',
        message: 'Please provide a word'
      })
    }
    
    const existingWord = await Word.findOne({ word: word.toLowerCase() })
    if (existingWord) {
      return res.status(409).json({ 
        error: 'Word already exists',
        message: 'This word is already in the database'
      })
    }
    
    const newWord = new Word({
      word: word.toLowerCase(),
      category: category || 'other',
      definition: definition || ''
    })
    
    await newWord.save()
    
    res.status(201).json({
      message: 'Word created successfully',
      word: newWord.getInfo()
    })
  } catch (error) {
    console.error('Error creating word:', error)
    res.status(500).json({ 
      error: 'Failed to create word',
      message: error.message 
    })
  }
}

// Update a word
export const updateWord = async (req, res) => {
  try {
    const { word, category, definition } = req.body
    
    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      { 
        word: word?.toLowerCase(), 
        category, 
        definition,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )
    
    if (!updatedWord) {
      return res.status(404).json({ 
        error: 'Word not found',
        message: 'No word found with the provided ID'
      })
    }
    
    res.json({
      message: 'Word updated successfully',
      word: updatedWord.getInfo()
    })
  } catch (error) {
    console.error('Error updating word:', error)
    res.status(500).json({ 
      error: 'Failed to update word',
      message: error.message 
    })
  }
}

// Delete a word
export const deleteWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndDelete(req.params.id)
    
    if (!word) {
      return res.status(404).json({ 
        error: 'Word not found',
        message: 'No word found with the provided ID'
      })
    }
    
    res.json({
      message: 'Word deleted successfully',
      word: word.getInfo()
    })
  } catch (error) {
    console.error('Error deleting word:', error)
    res.status(500).json({ 
      error: 'Failed to delete word',
      message: error.message 
    })
  }
}

