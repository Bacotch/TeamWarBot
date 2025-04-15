import { Client, Collection, GatewayIntentBits } from "discord.js"
import fs from "fs/promises";
import path, { join } from "path";
import { fileURLToPath } from "url";
import { Command } from "./definitions/class.ts";
import interaction from "./events/discord/interaction.ts";

export class Bot extends Client {
    public readonly db: any;
    public readonly commands: Collection<string,Command>;
    public readonly http: any;

    constructor(){
        super({
            intents:[GatewayIntentBits.Guilds]
        })

       // this.db = new DB();
        this.commands = new Collection();
        //this.http = new HTTP();
    }

    async start(){
        const currentDir = path.dirname(fileURLToPath(import.meta.url))

        const eventDir = join(currentDir,"events")
        const subEventDir = await fs.readdir(eventDir)
        for (const dir of subEventDir){
            const eventFiles = (await fs.readdir(join(eventDir,dir))).filter(file=>file.endsWith(".ts"))
            for(const file of eventFiles) {
                const event = (await import(`./events/${dir}/${file}`)).default
                try {
                    this.on(event.name,(...arg)=> event.execute(...arg))
                    console.log(`load "${event.default.name}" event.`)
                } catch(e){
                    console.warn(`event [${file}] can't be imported properly.(${e})`)
                }
            }
        }

        const commandDir = join(currentDir,"commands")
        const subCommandDir = await fs.readdir(commandDir)
        for (const dir of subCommandDir){
            const commandFiles = (await fs.readdir(join(commandDir,dir))).filter(file=>file.endsWith(".ts"))
            for(const file of commandFiles) {
                const command = new (await import(`./commands/${dir}/${file}`)).default
                try {
                   this.commands.set(command.data.name,command)
                    console.log(`load "${command.data.name}" command.`)
                } catch(e){
                    console.warn(`command [${file}] can't be imported properly.(${e})`)
                }
            }
        }
        
        await this.login(process.env.TOKEN)
    }
}