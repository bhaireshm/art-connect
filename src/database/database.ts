import { PROJECT_NAME } from "@/utils/constants";
import Log from "@/utils/log";
import {
  type ConnectOptions,
  Connection,
  type SchemaOptions,
  connect,
  disconnect,
} from "mongoose";
import DatabaseError from "./db.error";

/**
 * A singleton class that manages the database connection.
 */
class Database {
  private static instance: Database;
  private _instance!: Connection;

  /**
   * Returns the singleton instance of the Database class.
   *
   * @returns The singleton instance of the Database class.
   */
  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  /**
   * Connects to the database.
   *
   * @param options The options to use for connecting to the database.
   * @returns The database connection.
   */
  public async connect(options?: ConnectOptions): Promise<Connection> {
    try {
      const MONGODB_URI = `${process.env.DB_URL}${process.env.DB_NAME}`;
      if (!MONGODB_URI) throw new DatabaseError("'MONGODB_URI' not defined");

      const dbOptions: ConnectOptions = {
        appName: PROJECT_NAME,
        ...options,
      };

      const connection = await connect(MONGODB_URI, dbOptions);
      Log.info(`Connected to '${MONGODB_URI.split("/").pop()}'`);

      this._instance = connection.connection;
      return connection.connection;
    } catch (error: any) {
      if (error?.name === "MongooseError" && error?.message?.includes("Can't call `openUri()`")) {
        Log.info("Reconnecting to database...");
        await this.close();
        return this.connect();
      }
      Log.error(error);
      throw error;

    }
  }

  /**
   * Connects to the database.
   *
   * @returns The database connection.
   */
  public static async connect() {
    return this.getInstance().connect();
  }

  /**
   * Disconnects from the database.
   *
   * @returns A promise that resolves when the disconnection is complete.
   */
  public async disconnect(): Promise<void> {
    await disconnect();
  }

  /**
   * Closes the database connection.
   *
   * @returns A promise that resolves when the connection is closed.
   */
  public async close(): Promise<void> {
    await this._instance.close();
  }

  /**
   * Returns the default schema options.
   *
   * @param options The options to override the default schema options.
   * @returns The default schema options.
   */
  public static getDefaultSchemaOptions(
    options?: SchemaOptions,
  ): SchemaOptions {
    return {
      timestamps: true,
      versionKey: false,
      toObject: { useProjection: true },
      toJSON: {
        useProjection: true,
        transform(_, ret) {
          ret.id = ret._id;
          delete ret._id;
          if (ret.password) delete ret.password;
          return ret;
        },
      },
      ...options,
    };
  }
}

export default Database;
