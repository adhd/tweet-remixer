import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'
import { Anthropic } from '@anthropic-ai/sdk'
import cors from 'cors'
import { PROMPTS } from './config/prompts.js'

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const result = config({ path: join(__dirname, '.env') })

// Debug environment loading
console.log('\n--- Environment Debug ---')
console.log('Dotenv loaded:', result.parsed ? 'Yes' : 'No')
console.log('Dotenv error:', result.error ? result.error.message : 'None')
console.log('API Key exists:', !!process.env.CLAUDE_API_KEY)
console.log('API Key starts with:', process.env.CLAUDE_API_KEY?.substring(0, 10))

if (!process.env.CLAUDE_API_KEY) {
  console.error('ERROR: CLAUDE_API_KEY is not set in environment variables')
  process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
})

app.post('/api/remix', async (req, res) => {
  try {
    const { text } = req.body
    
    // Debug API key at request time
    console.log('\n--- Request Debug ---')
    console.log('API Key available at request:', !!process.env.CLAUDE_API_KEY)
    console.log('Anthropic client:', {
      hasApiKey: !!anthropic.apiKey
    })
    
    if (!text) {
      console.error('No text provided in request')
      return res.status(400).json({ error: 'No text provided' })
    }
    
    console.log('\n--- New Request ---')
    console.log('Input text length:', text.length)
    
    try {
      const response = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 150,
        messages: [{
          role: "user",
          content: PROMPTS.tweetRemix(text)
        }],
        system: "You are a tweet writer with ONE JOB: Write tweets under 280 characters. If you write more than 280 characters, you have FAILED. No exceptions."
      })
      
      console.log('Response:', response)
      
      let tweetText = ''
      if (response.content && response.content[0] && response.content[0].text) {
        tweetText = response.content[0].text.trim()
        
        if (tweetText.length > 280) {
          console.warn('Response exceeded 280 characters, truncating...')
          tweetText = tweetText.slice(0, 277) + '...'
        }
      } else {
        throw new Error('Unexpected response format from Claude API')
      }
      
      return res.json({
        content: [{ text: tweetText }]
      })
    } catch (apiError) {
      // Log the complete error
      console.error('Claude API Error:', {
        message: apiError.message,
        name: apiError.name,
        status: apiError.status,
        response: apiError.response,
        raw: apiError
      })
      throw apiError
    }
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    return res.status(500).json({ 
      error: 'Error processing request',
      details: error.message
    })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 