import { ChatInputCommandInteraction, Events, MessageFlags } from 'discord.js'
import { Bot } from '../../core/Bot.ts'

export default {
  name: Events.InteractionCreate,
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return

    const bot = interaction.client as Bot
    const command = bot.commands.get(interaction.commandName)
    if (!command || !command.execute) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      command.execute(interaction)
    } catch (e) {
      console.error(e)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command',
          flags: MessageFlags.Ephemeral,
        })
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command',
          flags: MessageFlags.Ephemeral,
        })
      }
    }
  },
}
