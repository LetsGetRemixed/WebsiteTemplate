import React, { useState, useEffect } from 'react'

const HomePage = () => {
  const [word, setWord] = useState('Loading...')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWord()
  }, [])

  const fetchWord = async () => {
    try {
      const response = await fetch('/api/words/random')
      if (!response.ok) {
        throw new Error('Failed to fetch word')
      }
      const data = await response.json()
      setWord(data.word)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const getWordDisplay = () => {
    if (loading) {
      return <span className="text-gray-500 italic">Loading...</span>
    } else if (error) {
      return <span className="text-red-500">Error: {error}</span>
    } else {
      return <span className="text-green-600 font-semibold">{word}</span>
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Hello
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Backend Connection Test
          </h2>
          <p className="text-gray-600 mb-4">
            This word was fetched from the backend:
          </p>
          <div className="text-3xl font-bold mb-4">
            {getWordDisplay()}
          </div>
          <p className="text-sm text-gray-500">
            If you see a word above, the backend is working correctly!
          </p>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>Website Template with React + Tailwind CSS v4 + Node.js + MongoDB</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
