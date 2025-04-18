import 'reflect-metadata'
import conf from './config.ts'
import { config } from 'dotenv'
import { Bot } from './core/Bot.ts'
import { Server } from './api/server.ts'
import { Database } from './database/index.ts'
import { initContainer } from './core/container.ts'
import { container } from 'tsyringe'
import path from 'path'
import { fileURLToPath } from 'url'

config()
const rootDir = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(rootDir, conf.databasePath)
const port = conf.port

async function main(): Promise<void> {
  await initContainer(rootDir, dbPath, port)
  const server = container.resolve(Server)
  await server.start()
  const database = container.resolve(Database)
  database.start()
  const bot = container.resolve(Bot)
  await bot.start()
}

async function stop(): Promise<void> {
  const server = container.resolve(Server)
  await server.stop()
  const database = container.resolve(Database)
  database.stop()
  const bot = container.resolve(Bot)
  await bot.stop()
  console.log('Whole instance closed properly.')
}

main()

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
process.on('SIGQUIT', stop)
