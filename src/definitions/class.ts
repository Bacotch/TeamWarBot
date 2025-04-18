import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export abstract class Command {
  public readonly data: SlashCommandBuilder

  constructor(name: string, description: string) {
    this.data = new SlashCommandBuilder().setName(name).setDescription(description)
  }

  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>
}
