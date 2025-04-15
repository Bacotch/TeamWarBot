import Database from "better-sqlite3"

const db = new Database("./user_links.db")

db.prepare(`CREATE TABLE IF NOT EXISTS users (
    player_id TEXT PRIMARY KEY,
    discord_user_id INTEGER UNIQUE,
    team_id INTENGER NOT NULL,
    verification_status TEXT NOT NULL,
    verification_code TEXT
    )
    `).run()

export const insertUserInfo = db.prepare("INSERT INTO users VALUES(?,?,?,?,?)")
export const uniqueSql = db.prepare("SELECT player_id FROM users WHERE player_id = ?")