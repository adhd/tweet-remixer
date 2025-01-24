import { useState, useEffect } from 'react'
import axios from 'axios'
import { RainbowButton } from './components/ui/rainbow-button'
import { ArrowPathIcon, SparklesIcon, ClipboardIcon, BookmarkIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HeroHeader from "./components/hero-header";
import { GlowEffect } from './components/ui/glow-effect'
import "./index.css";

// Configure axios
axios.defaults.baseURL = 'http://localhost:3000'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingSaved, setIsLoadingSaved] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [savedTweets, setSavedTweets] = useState([])
  const [error, setError] = useState(null)

  // Load saved tweets on mount
  useEffect(() => {
    loadSavedTweets()
  }, [])

  const loadSavedTweets = async () => {
    try {
      setIsLoadingSaved(true)
      const response = await axios.get('/api/tweets')
      setSavedTweets(response.data)
      setError(null)
    } catch (err) {
      console.error('Failed to load saved tweets:', err)
      if (!err.response || err.response.status !== 200) {
        setError('Failed to load saved tweets')
      }
    } finally {
      setIsLoadingSaved(false)
    }
  }

  const handleRemix = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/remix', {
        text: inputText
      })
      
      setOutputText(response.data.content[0].text)
    } catch (error) {
      console.error('Error remixing text:', error)
      setError('Error generating tweets. Please try again.')
      setOutputText('')
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
      setError('Failed to copy to clipboard')
    }
  }

  const handleSaveTweet = async (tweet) => {
    try {
      setIsSaving(true)
      const response = await axios.post('/api/tweets', {
        content: tweet
      })
      setSavedTweets([response.data, ...savedTweets])
      setShowSaved(true) // Show the saved tweets panel
    } catch (err) {
      console.error('Failed to save tweet:', err)
      setError('Failed to save tweet')
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveSaved = async (id) => {
    try {
      await axios.delete(`/api/tweets/${id}`)
      setSavedTweets(savedTweets.filter(tweet => tweet.id !== id))
    } catch (err) {
      console.error('Failed to remove tweet:', err)
      setError('Failed to remove tweet')
    }
  }

  const characterCount = inputText.length
  const isOverLimit = characterCount > 10000
  const remainingCharacters = 10000 - characterCount

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 py-16">
        {/* Fixed position button without transform */}
        <button
          onClick={() => setShowSaved(!showSaved)}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all backdrop-blur-md shadow-lg"
        >
          <BookmarkIcon className="w-5 h-5" />
          <span className="text-sm font-medium">({savedTweets.length})</span>
        </button>

        <HeroHeader />
        <div className="relative">
          <div className="flex-1 max-w-[640px] mx-auto px-4 sm:px-8 py-12">
            <div className="space-y-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
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
                      Generated Tweets
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setShowSaved(!showSaved)}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <BookmarkIcon className="w-4 h-4" />
                        <span>Saved ({savedTweets.length})</span>
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  {outputText.split('\n\n')
                    .filter(tweet => !tweet.match(/^-+TWEET-+$/))
                    .map((tweet, index) => (
                    <div key={index} className="relative mb-4 last:mb-0">
                      <div className="relative bg-white rounded-xl">
                        <GlowEffect
                          colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
                          mode="breathe"
                          blur="softest"
                          scale={1.000025}
                          duration={4}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut",
                            delay: index * 0.8,
                            repeatType: "mirror"
                          }}
                        />
                        <div className="relative z-10 text-gray-900 text-[15px] whitespace-pre-wrap p-4 rounded-xl bg-white">
                          <div className="flex justify-between gap-4">
                            <div className="flex-1">{tweet}</div>
                            <div className="flex-shrink-0 flex items-center gap-2">
                              <button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank')}
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                title="Tweet this"
                              >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleSaveTweet(tweet)}
                                disabled={isSaving}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                              >
                                <BookmarkIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 
              ${showSaved ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setShowSaved(false)}
          />
          
          {/* Full-screen mobile sidebar */}
          <div 
            className={`fixed inset-0 bg-white z-50 overflow-y-auto overflow-x-hidden md:right-0 md:left-auto md:w-80
              transform transition-transform duration-300 ease-in-out
              ${showSaved ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-6 max-w-lg mx-auto md:max-w-none">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Saved Tweets</h2>
                <button
                  onClick={() => setShowSaved(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {isLoadingSaved ? (
                  <div className="text-center py-8">
                    <ArrowPathIcon className="w-6 h-6 animate-spin mx-auto" />
                  </div>
                ) : (
                  <>
                    {savedTweets.length === 0 ? (
                      <div className="text-center py-8">
                        <BookmarkIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">No saved tweets yet</p>
                      </div>
                    ) : (
                      savedTweets.map((tweet) => (
                        <div key={tweet.id} className="relative bg-gray-50 rounded-lg p-4 text-sm">
                          <div className="flex justify-between gap-3">
                            <div className="flex-1">{tweet.content}</div>
                            <button
                              onClick={() => handleRemoveSaved(tweet.id)}
                              className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <XMarkIcon className="w-5 h-5 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Built with AI to help you create more engaging tweets.
            <br />
            Input limit: 10,000 characters
          </p>
        </footer>
      </div>
    </main>
  )
}

export default App
