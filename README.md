# TweetGen

AI-powered tweet generator with Supabase storage and direct Twitter integration.

## Prerequisites

1. Node.js v18+
2. [Supabase](https://supabase.com) account
3. [Anthropic](https://anthropic.com) account for Claude API

## Setup

```bash
cd backend
npm install
```

## Database Setup

1. Create a new Supabase project
2. Get your database credentials:
   - Go to Project Settings → Database
   - Under "Connection string", copy the PostgreSQL connection URL
   - Save your database password

## Environment Variables

Create a `.env` file in `backend/`:

```bash
# Required - Supabase Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"

# Required - Claude API
CLAUDE_API_KEY="your-anthropic-api-key"
```

Get your Supabase credentials:

1. Database URL: Project Settings → Database → Connection string (URI)
2. Project URL: Project Settings → API → Project URL
3. Anon Key: Project Settings → API → Project API keys → anon public

## Database Schema

Using Prisma with Supabase PostgreSQL. After any schema changes in `prisma/schema.prisma`:

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to Supabase
npx prisma db push
```

## Development

```bash
# Install dependencies in both directories
cd frontend && npm install
cd ../backend && npm install

# Start frontend dev server (default: http://localhost:5173)
cd frontend && npm run dev

# Start backend server (default: http://localhost:3000)
cd backend && node server.js
```

The frontend will automatically proxy API requests to the backend.

## API Endpoints

- `POST /api/generate` - Generate tweet variations
- `POST /api/tweets` - Save a tweet
- `GET /api/tweets` - Get all saved tweets
- `DELETE /api/tweets/:id` - Delete a saved tweet

## Tech Stack

- Frontend: React, Tailwind, Framer Motion
- Backend: Express, Supabase (PostgreSQL), Prisma
- AI: Claude 3 Opus

## Features

- ✨ Clean, modern UI with Tailwind CSS
- 🤖 Powered by Claude AI for creative text remixing
- 🚀 Built with Vite for fast development
- 💾 Persistent storage with Supabase
- 📝 Simple and intuitive text interface
- 📈 Real-time character counting
- 🎨 Animated UI components

## Project Structure

```
backend/
├── prisma/           # Database schema and migrations
├── db/               # Database client configuration
├── server.js         # Express server
└── .env             # Environment variables

frontend/
├── src/
│   ├── components/   # React components
│   ├── services/    # API and service functions
│   ├── App.jsx     # Main application component
│   └── main.jsx    # Application entry point
```

## Troubleshooting

- If you get database connection errors, verify your Supabase connection string and password
- Ensure Prisma schema is synced with `npx prisma db push`
- Check that all environment variables are set correctly

## License

MIT
