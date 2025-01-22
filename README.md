# Content Remix App

A modern React application that uses AI to transform and remix text content.

## Features

- ✨ Clean, modern UI with Tailwind CSS
- 🤖 Powered by Claude AI for creative text remixing
- 🚀 Built with Vite for fast development
- 📝 Simple and intuitive text input/output interface

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Claude API key:

```
VITE_CLAUDE_API_KEY=your_claude_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Tech Stack

- React
- Tailwind CSS
- Vite
- Claude API
- Axios

## Project Structure

```
src/
├── components/        # React components
├── services/         # API and service functions
│   └── aiService.js  # Claude API integration
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Future Enhancements

1. Additional AI API integrations
2. Audio file upload and transcription
3. Social media sharing
4. Database integration for saving remixes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
