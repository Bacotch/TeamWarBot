import { ChatInputCommandInteraction, Events, MessageFlags} from "discord.js";
import { Bot } from "../../Bot.ts";

export default {
    name:Events.InteractionCreate,
    execute:async(interaction:ChatInputCommandInteraction) => {
    
        if (!interaction.isChatInputCommand()) return;
    
        const command = interaction.client as Bot
        const cmd = command.commands.get(interaction.commandName);
        if(!cmd){
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        };
    
        try {
            cmd.execute(interaction);
        } catch (e) {
            console.error(e);
            if(interaction.replied || interaction.deferred){
                await interaction.followUp({content:"There was an error while executing this command", flags: MessageFlags.Ephemeral})
            } else {
                await interaction.reply({content:"There was an error while executing this command", flags: MessageFlags.Ephemeral})
            }
        }
    
    }
}