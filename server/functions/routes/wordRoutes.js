const express = require('express')
const { getRandomWord, getAllWords } = require('../controllers/wordController')

const router = express.Router()

router.get('/random', getRandomWord)
router.get('/', getAllWords)

module.exports = router


