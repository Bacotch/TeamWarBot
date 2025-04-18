import { APIApplicationCommand, REST, Routes } from 'discord.js'
import 'dotenv/config'
import fs from 'fs/promises'
import path, { join } from 'path'
import { fileURLToPath } from 'url'
import { Command } from './definitions/class.ts'

const token = process.env.TOKEN
const appID = process.env.APPLICATION_ID
const guildID = process.env.DEV_GUILD_ID

if (!(token && appID && guildID)) {
  throw new Error('Invalid token or appId or guildId error.')
}

const commands: Command[] = []
const currentDir = path.dirname(fileURLToPath(import.meta.url))
const commandDir = join(currentDir, 'commands')
const subDir = await fs.readdir(commandDir)
for (const dir of subDir) {
  const commandFiles = (await fs.readdir(join(commandDir, dir))).filter((file) => file.endsWith('.ts'))
  for (const file of commandFiles) {
    const command = new (await import(`./commands/${dir}/${file}`)).default()
    try {
      commands.push(command.data.toJSON())
      console.log(`add "${command.data.name}"`)
    } catch (e) {
      console.warn(`command [${file}] can't be imported properly.(${e})`)
    }
  }
}

const rest = new REST().setToken(token)

;(async () => {
  try {
    console.log('Starting rest.put...')
    const data = (await rest.put(Routes.applicationGuildCommands(appID, guildID), {
      body: commands,
    })) as APIApplicationCommand[]
    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (e) {
    console.error(e)
  }
})()
