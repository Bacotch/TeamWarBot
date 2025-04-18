import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../definitions/class.ts";

export default class extends Command{
    constructor(){
        super("ping","pingを返します。")
    }
    async execute(interaction:ChatInputCommandInteraction){
        await interaction.reply("pong!")
    }
}