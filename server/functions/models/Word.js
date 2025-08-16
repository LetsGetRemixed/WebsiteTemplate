const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true, trim: true },
  category: { type: String, enum: ['noun', 'verb', 'adjective', 'adverb', 'other'], default: 'other' },
  definition: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true })

wordSchema.index({ category: 1 })

wordSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

wordSchema.statics.getRandomWord = async function() {
  const count = await this.countDocuments()
  const random = Math.floor(Math.random() * count)
  return this.findOne().skip(random)
}

wordSchema.methods.getInfo = function() {
  return {
    id: this._id,
    word: this.word,
    category: this.category,
    definition: this.definition,
    createdAt: this.createdAt
  }
}

module.exports = mongoose.model('Word', wordSchema)


