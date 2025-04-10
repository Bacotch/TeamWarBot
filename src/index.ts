import { Client, Events, GatewayIntentBits } from 'discord.js';
import "dotenv/config";

const token = process.env.DISCORD_BOT_TOKEN;

if(!token){
    console.error("INVALID TOKEN ERROR");
    process.exit(1);
}

const client = new Client ({
    intents:[GatewayIntentBits.Guilds]
})

そうでなければかってもべつにいいんだけどねえ