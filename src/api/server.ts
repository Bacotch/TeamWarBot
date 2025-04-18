import Fastify, {FastifyInstance} from "fastify";
import user from "../routes/user.ts"
import system from "../routes/system.ts";
import { injectable, singleton, inject } from "tsyringe";
import { PORT } from "../core/container.ts";

@injectable()
@singleton()
export class Server {
    private instance: FastifyInstance;
    private port: number;

    constructor(@inject(PORT) port:number){
        this.port= port;
        this.instance = Fastify({logger: true});
    };

    public async start(){
        await this.routing()
        try {
            await this.instance.listen({ port:this.port });
        } catch (e) {
            console.log("Error starting HTTP server",e);
            process.exit(1);
        }
    }

    public async stop(){
        await this.instance.close()
        console.log("Server instance closed properly.")
    }

    private async routing(){
        await this.instance.register(system);
        //await this.instance.register(user)
    }
    
}

