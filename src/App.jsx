import { useState } from 'react'
import axios from 'axios'
import { RainbowButton } from './components/ui/rainbow-button'
import { ArrowPathIcon, SparklesIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import HeroHeader from "./components/hero-header";
import "./index.css";

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleRemix = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      const response = await axios.post('/api/remix', {
        text: inputText
      })
      
      setOutputText(response.data.content[0].text)
    } catch (error) {
      console.error('Error remixing text:', error)
      setOutputText('Error occurred while remixing text. Please try again.')
    }
    setIsLoading(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const characterCount = inputText.length
  const isOverLimit = characterCount > 10000
  const remainingCharacters = 10000 - characterCount

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <HeroHeader />
        <div className="max-w-[640px] mx-auto px-8 py-12">
          <div className="space-y-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[15px] font-medium text-gray-700">
                  Your Text
                </label>
                <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                  {characterCount}/10,000
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here (max 10,000 characters)..."
                className="w-full h-[180px] p-4 bg-gray-50 rounded-xl placeholder-gray-400 text-gray-900 text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-shadow"
              />
              {isOverLimit && (
                <p className="mt-1 text-sm text-red-500">
                  Text is too long. Please remove {Math.abs(remainingCharacters)} characters.
                </p>
              )}
            </div>

            <div className="flex justify-center relative z-10">
              <RainbowButton
                onClick={handleRemix}
                disabled={isLoading || !inputText.trim() || isOverLimit}
                className="w-full max-w-md"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      <span>Generate Tweet</span>
                    </>
                  )}
                </div>
              </RainbowButton>
            </div>

            {outputText && (
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[15px] font-medium text-gray-700">
                    Generated Text
                  </label>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ClipboardIcon className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="relative bg-gray-50 rounded-xl p-4 text-gray-900 text-[15px] whitespace-pre-line">
                  {outputText}
                </div>
              </div>
            )}
          </div>

          <footer className="mt-8 text-center text-sm text-gray-500">
            <p>
              Built with AI to help you create more engaging tweets.
              <br />
              Input limit: 10,000 characters
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}

export default App
