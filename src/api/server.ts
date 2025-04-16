import Fastify, {FastifyInstance,FastifyRequest,FastifyReply} from "fastify";

export class Server {
    public instance: FastifyInstance;
    private port: number;

    constructor(port:number){
        this.port= port;
        this.instance = Fastify();
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

    public post(path: string, handler: any){
        this.instance.post(path,handler);
    }

    public get(path: string, handler: any){
        this.instance.get(path,handler)
    }
}

