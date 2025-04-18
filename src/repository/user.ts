import { Database } from "../database/index.ts";
import sql from "better-sqlite3"

export class UsersDB{

    private insertUserStmt: sql.Statement
    private uniquePlayerStmt: sql.Statement
    private isValidCodeStmt: sql.Statement
    private verifyUserStmt: sql.Statement
    private getTeamIdStmt: sql.Statement

    constructor(private dbService: Database) {
        this.insertUserStmt = this.dbService.prepare("INSERT INTO users VALUES(?,?,?,?,?)");
        this.uniquePlayerStmt = this.dbService.prepare("SELECT player_id FROM users WHERE player_id = ?");
        this.isValidCodeStmt = this.dbService.prepare("SELECT verification_status FROM users WHERE verification_code = ?");
        this.verifyUserStmt = this.dbService.prepare("UPDATE users SET discord_user_id = ? , verification_status = 'verified' , verification_code = null WHERE verification_code = ?");
        this.getTeamIdStmt = this.dbService.prepare("SELECT team_id FROM users WHERE verification_status = 'verified' AND discord_user_id = ? ");
      }

      insertUser(playerId:number,discordId:number,teamId:number,status:string,code:string){
        try {
            this.insertUserStmt.run(playerId,discordId,teamId,status,code)
        } catch (e) {
            console.error(e)
        }
    }

    isPlayerUnique(playerId:number){
        const result = this.uniquePlayerStmt.get(playerId)
        return result === undefined
    }

    getUserbyPlayerId(playerId:number){
        return this.uniquePlayerStmt.get(playerId)
    }

    isValidCode(verification_code:string){
        const status = this.isValidCodeStmt.get(verification_code) as string
        if(status === "pending")return true
        else if (status === "verified" || status === undefined) return false//通常は認証時にコードは削除されています。
    }
    
    verifyUser(discord_user_id:number,verification_code:string){
        this.verifyUserStmt.run(discord_user_id,verification_code)
    }

    //verifyされてなければundefined
    getTeamId(discord_user_id:number){
        const result =  this.getTeamIdStmt.get(discord_user_id) as number
        if(!result)return undefined
        return result
    }

}