import sql from "better-sqlite3"

export class Database extends sql{

    private insertUserStmt: sql.Statement
    private uniquePlayerStmt: sql.Statement
    private isValidCodeStmt: sql.Statement
    private verifyUserStmt: sql.Statement
    private getTeamIdStmt: sql.Statement

    constructor(filename:string){
        super(filename)
        this.insertUserStmt = this.prepare("INSERT INTO users VALUES(?,?,?,?,?)")
        this.uniquePlayerStmt = this.prepare("SELECT player_id FROM users WHERE player_id = ?")
        this.isValidCodeStmt = this.prepare("SELECT verification_status FROM users WHERE verification_code = ?")
        this.verifyUserStmt = this.prepare("UPDATE users SET discord_user_id = ? , verification_status = 'verified' , verification_code = null WHERE verification_code = ?")
        this.getTeamIdStmt = this.prepare("SELECT team_id FROM users WHERE verification_status = 'verified' AND discord_user_id = ? ")
        this.ready()
    }

    ready(){
        try {
            this.prepare(`CREATE TABLE IF NOT EXISTS users (
                player_id TEXT PRIMARY KEY,
                discord_user_id INTEGER UNIQUE,
                team_id INTENGER NOT NULL,
                verification_status TEXT NOT NULL,
                verification_code TEXT
                )
                `).run()
            console.log("database connected successfully.")
        } catch (e) {
            console.error(`database connection fail.(${e})`)
        }
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
