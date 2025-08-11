import express from 'express'
import {
  getRandomWord,
  getAllWords,
  getWordById,
  createWord,
  updateWord,
  deleteWord
} from '../controllers/wordController.js'

const router = express.Router()

// GET /api/words/random - Get a random word
router.get('/random', getRandomWord)

// GET /api/words - Get all words (with pagination and filtering)
router.get('/', getAllWords)

// GET /api/words/:id - Get word by ID
router.get('/:id', getWordById)

// POST /api/words - Create a new word
router.post('/', createWord)

// PUT /api/words/:id - Update a word
router.put('/:id', updateWord)

// DELETE /api/words/:id - Delete a word
router.delete('/:id', deleteWord)

export default router

