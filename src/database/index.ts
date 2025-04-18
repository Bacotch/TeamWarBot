import sql, { Statement } from 'better-sqlite3'
import { injectable, singleton, inject } from 'tsyringe'
import { DB_PATH } from '../core/container.ts'

@injectable()
@singleton()
export class Database {
  public readonly instance

  constructor(@inject(DB_PATH) filename: string) {
    this.instance = new sql(filename)
  }

  start() {
    try {
      this.instance
        .prepare(
          `CREATE TABLE IF NOT EXISTS users (
                player_id TEXT PRIMARY KEY,
                discord_user_id INTEGER UNIQUE,
                team_id INTENGER NOT NULL,
                verification_status TEXT NOT NULL,
                verification_code TEXT
                )
                `,
        )
        .run()
      console.log('database connected successfully.')
    } catch (e) {
      console.error(`database connection fail.(${e})`)
    }
  }

  stop() {
    this.instance.close()
    console.log('Database disconnected properly.')
  }

  prepare(sql: string) {
    if (!this.instance) {
      throw new Error('Database service is not initialized.')
    }
    return this.instance.prepare(sql)
  }

  close() {
    if (!this.instance) return
    this.instance.close()
    console.log('Database connection closed.')
  }
}
