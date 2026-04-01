import path, { resolve } from 'node:path'
import { config } from "dotenv"
import { defineConfig } from 'prisma/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Explicitly load .env.local
config({ path: resolve(__dirname, ".env") })

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in .env.local")
}

export default defineConfig({
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  migrations: {
    seed: "npx tsx ./prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  }
})