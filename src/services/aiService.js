import axios from 'axios'

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY

const aiService = {
  remixText: async (text) => {
    try {
      // TODO: Replace with actual Claude API endpoint and implementation
      const response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Please remix and creatively rewrite the following text while maintaining its core message: "${text}"`
        }]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      })

      return response.data
    } catch (error) {
      console.error('Error calling Claude API:', error)
      throw error
    }
  }
}

export default aiService 