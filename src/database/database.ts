import { type ConnectOptions, Connection, connect, disconnect } from "mongoose";
import DatabaseError from "./db.error";

class Database {
  private static instance: Database;
  private _instance!: Connection;

  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  public async connect(options?: ConnectOptions): Promise<Connection> {
    const MONGODB_URI = `${process.env.DB_URL}${process.env.DB_NAME}`;
    if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");
    const dbOptions = { ...options };

    try {
      const connection = await connect(MONGODB_URI, dbOptions);
      console.log(`Connected to ${connection.connection.db.databaseName}`);

      // Load all the models
      console.log("Loading models...");
      await this.loadModels();

      return connection.connection;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  public static async connect() {
    return this.getInstance().connect();
  }

  public async disconnect(): Promise<void> {
    await disconnect();
  }

  public async close(): Promise<void> {
    await this._instance.close();
  }

  private async loadModels(): Promise<void> {
    await import("@/models");
  }
}

export default Database;
