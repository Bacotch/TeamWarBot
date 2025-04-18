import { ChatInputCommandInteraction } from 'discord.js'
import { Command } from '../../definitions/class.ts'

export default class extends Command {
  constructor() {
    super('sync', 'MinecraftとDiscordアカウントを紐付けます。')
    this.data.addStringOption((option) => option.setName('code').setDescription('認証コード').setRequired(true))
  }
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('hi')
  }
}
