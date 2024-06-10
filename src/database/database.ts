import { PROJECT_NAME } from "@/utils/constants";
import Log from "@/utils/log";
import { type ConnectOptions, Connection, type SchemaOptions, connect, disconnect } from "mongoose";
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
    if (!MONGODB_URI) throw new DatabaseError("MONGODB_URI not defined");
    const dbOptions: ConnectOptions = {
      appName: PROJECT_NAME,
      ...options,
    };

    const connection = await connect(MONGODB_URI, dbOptions);
    Log.info(`Connected to ${connection.connection.db.databaseName}`);

    return connection.connection;
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

  public static getDefaultSchemaOptions(options?: SchemaOptions): SchemaOptions {
    return {
      timestamps: true,
      versionKey: false,
      toJSON: {
        transform(_, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
      ...options,
    };
  }
}

export default Database;
