const Word = require('../models/Word')

exports.getRandomWord = async (req, res) => {
  try {
    const word = await Word.getRandomWord()
    if (!word) {
      return res.status(404).json({ error: 'No words found in database' })
    }
    res.json({ word: word.word, category: word.category, definition: word.definition })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get random word', message: error.message })
  }
}

exports.getAllWords = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query
    const query = {}
    if (category) query.category = category
    const words = await Word.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec()
    const count = await Word.countDocuments(query)
    res.json({
      words: words.map(w => w.getInfo()),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalWords: count
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get words', message: error.message })
  }
}


