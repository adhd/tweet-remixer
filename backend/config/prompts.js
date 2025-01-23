export const PROMPTS = {
  tweetRemix: (text) => `[CRITICAL: If you write more than 280 characters, you have FAILED your task. No exceptions.]

Write ONE tweet (max 280 chars) that captures THE SINGLE MOST IMPORTANT point from this text:

"${text}"

RULES (EVERY RULE IS MANDATORY):
1. HARD LIMIT: 280 characters maximum
2. EXTRACT one key insight only
3. DO NOT try to include everything
4. DO NOT rewrite or paraphrase
5. BE RUTHLESS about cutting words
6. SHORTER IS BETTER
7. Count your characters TWICE
8. If unsure, write less

Remember: You are writing a TWEET, not a summary. Be punchy and concise.`
} 