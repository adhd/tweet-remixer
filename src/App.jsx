import { useState } from 'react'
import axios from 'axios'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRemix = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      // TODO: Replace with actual Claude API endpoint
      const response = await axios.post('/api/remix', {
        text: inputText
      })
      setOutputText(response.data.remixedText)
    } catch (error) {
      console.error('Error remixing text:', error)
      setOutputText('Error occurred while remixing text. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Content Remix
        </h1>
        
        <div className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
              Original Text
            </label>
            <textarea
              id="input"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to remix..."
            />
          </div>

          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Remixing...' : 'Remix Content'}
          </button>

          {outputText && (
            <div>
              <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-2">
                Remixed Output
              </label>
              <textarea
                id="output"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                value={outputText}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
