export const PROMPTS = {
  tweetRemix: (text) => `write 5 different lowercase tweets from this. each should be an unobvious insight that makes people think:

"${text}"

rules:
1. all lowercase
2. no hashtags or emojis
3. no thread markers (1/5 etc)
4. no "let me tell you why..."
5. no corporate/influencer speak
6. no obvious statements
7. be witty when it fits naturally
8. make each insight genuinely surprising
9. CRITICAL: separate each tweet with the delimiter "---TWEET---" on its own line

style guide:
- write like you're sharing thoughts with smart friends
- be casual but insightful
- it's ok to be a bit weird/quirky
- focus on the non-obvious angles
- don't try to sound profound
- just say interesting things simply

format exactly like this:
first tweet here
---TWEET---
second tweet here
---TWEET---
third tweet here
---TWEET---
fourth tweet here
---TWEET---
fifth tweet here

IMPORTANT: each tweet must be separated by the delimiter "---TWEET---" on its own line.

remember: each tweet should make people stop and think "huh, i never thought about it that way"`
} 