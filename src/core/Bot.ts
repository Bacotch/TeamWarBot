import { Client, Collection, GatewayIntentBits } from "discord.js"
import fs from "fs/promises";
import { join } from "path";
import { Command } from "../definitions/interface.ts";
import { injectable, singleton, inject } from "tsyringe";
import { ROOT_DIR } from "./container.ts";


@injectable()
@singleton()
export class Bot extends Client {
    public readonly commands: Collection<string,Command>;
    private rootDir: string

    constructor(@inject(ROOT_DIR) dir:string){
        super({
            intents:[GatewayIntentBits.Guilds]
        })
        this.commands = new Collection();
        this.rootDir = dir;
    }

    async start(){

        const eventDir = join(this.rootDir,"events")
        const subEventDir = await fs.readdir(eventDir)
        for (const dir of subEventDir){
            const eventFiles = (await fs.readdir(join(eventDir,dir))).filter(file=>file.endsWith(".ts"))
            for(const file of eventFiles) {
                const event = (await import(`../events/${dir}/${file}`)).default
                    try {
                        this.on(event.name,(...arg)=> event.execute(...arg))
                        console.log(`load "${event.name}" event.`)
                    } catch(e){
                        console.warn(`event [${file}] can't be imported properly.(${e})`)
                    }
               
            }
        }

        const commandDir = join(this.rootDir,"commands")
        const subCommandDir = await fs.readdir(commandDir)
        for (const dir of subCommandDir){
            const commandFiles = (await fs.readdir(join(commandDir,dir))).filter(file=>file.endsWith(".ts"))
            for(const file of commandFiles) {
                const command:Command = new (await import(`../commands/${dir}/${file}`)).default
                if(command.data && command.execute){
                    try {
                        this.commands.set(command.data.name,command)
                         console.log(`load "${command.data.name}" command.`)
                     } catch(e){
                         console.warn(`command [${file}] can't be imported properly.(${e})`)
                     }
                } else {
                    console.warn(`command [${file}] is lacking data or execute propery.`) 
                }
                
            }
        }
        await this.login(process.env.TOKEN)
        console.log("Bot logined successfully.")
    }

    async stop(){
        await this.destroy()
        console.log("Bot instance closed properly.")
    }
    
}