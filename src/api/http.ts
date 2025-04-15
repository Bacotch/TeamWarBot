import http from "http";
import { uniqueSql,insertUserInfo } from "../database";

const server = http.createServer(async (req,res)=>{
    if(req.method === "POST" && req.url === "/player-info") {
        let body = "";
        req.on("data",(chunk) =>{
            body += chunk.toString();
        });

        req.on("end",async()=>{
            try {
                const {playerId,teamId,verificationCode} = JSON.parse(body);
                if(uniqueSql.run(playerId))return;
                insertUserInfo.run(playerId,null,teamId,"pending",verificationCode);
                res.writeHead(200,{"Content-Type": "text/plain"});
                res.end("Data processed successfully.");
            
            } catch(e){
                console.error(e)
                res.writeHead(400,{"Content-Type": "text/plain"});
                res.end("Invalid request data.");
            }
        });

    } else if (req.method === "GET" && req.url === "/status") {
        res.writeHead(200,{"Content-Type": "text/plain"});
        res.end("Server is running.");

    } else {
        res.writeHead(404,{"Content-Type": "text/plain"})
        res.end("Not Found")
    }
})

const port = 3000
server.listen(port,()=>{
    console.log(`HTTP server listening on port ${port}`)
})