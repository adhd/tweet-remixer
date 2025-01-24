import { PrismaClient } from '@prisma/client'
import pkg from 'pg'
const { Pool } = pkg
import { PrismaPg } from '@prisma/adapter-pg'
import process from 'node:process'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error']
})

export async function saveTweet(content) {
  try {
    console.log('Attempting to save tweet:', { content })
    await prisma.$connect()
    const result = await prisma.savedTweet.create({
      data: {
        content
      }
    })
    console.log('Tweet saved successfully:', result)
    return result
  } catch (error) {
    console.error('Error in saveTweet:', {
      error,
      message: error.message,
      code: error.code
    })
    throw error
  }
}

export async function getAllTweets() {
  try {
    console.log('Attempting to get all tweets')
    await prisma.$connect()
    const tweets = await prisma.savedTweet.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('Retrieved tweets:', tweets.length)
    return tweets
  } catch (error) {
    console.error('Error in getAllTweets:', {
      error,
      message: error.message,
      code: error.code
    })
    return []
  }
}

export async function deleteTweet(id) {
  try {
    console.log('Attempting to delete tweet:', { id })
    await prisma.$connect()
    const result = await prisma.savedTweet.delete({
      where: {
        id
      }
    })
    console.log('Tweet deleted successfully:', result)
    return result
  } catch (error) {
    console.error('Error in deleteTweet:', {
      error,
      message: error.message,
      code: error.code
    })
    throw error
  }
}

// Ensure proper cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect()
}) 