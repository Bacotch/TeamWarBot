import { config } from "dotenv";
import { Bot } from "./Bot.ts";
config()
function main(){
    const bot = new Bot();
    bot.start();
}

main();