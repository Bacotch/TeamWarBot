import Fastify, {FastifyInstance} from "fastify";
import user from "../routes/user.ts"

export class Server {
    public instance: FastifyInstance;
    private port: number;

    constructor(port:number){
        this.port= port;
        this.instance = Fastify({logger: true});
        this.start();
    };

    private async start(){
        try {
            await this.instance.listen({ port:this.port });
            console.log(`HTTP server listening on port ${this.port}`);
        } catch (e) {
            console.log("Error starting HTTP server",e);
            process.exit(1);
        }
    }
    private async routing(){
        await this.instance.register(user)
    }
    
}

