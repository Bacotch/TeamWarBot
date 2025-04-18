import { container, InjectionToken } from "tsyringe";

export const ROOT_DIR: InjectionToken<string> = Symbol("RootDir")
export const DB_PATH: InjectionToken<string> = Symbol("DbPath")
export const PORT: InjectionToken<number> = Symbol("Port")

export async function initContainer(rootDir: string, dbPath: string, port: number) {

    container.register<string>(ROOT_DIR, { useValue: rootDir });
    container.register<string>(DB_PATH, { useValue: dbPath });
    container.register<number>(PORT, { useValue: port });
    
}