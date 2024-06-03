import { ClientSession, Connection, Model } from "mongoose";

class DatabaseCRUD {
  private instance: Connection;

  private constructor(instance: Connection) {
    this.instance = instance;
  }

  public async create<T>(model: Model<T>, data: T): Promise<T> {
    const session = await this.startSession();
    try {
      session.startTransaction();
      const created = await model.create([data], { session });
      await session.commitTransaction();
      return created[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update<T>(model: Model<T>, query: any, data: Partial<T>): Promise<T | null> {
    const session = await this.startSession();
    try {
      session.startTransaction();
      const updated = await model.findOneAndUpdate(query, data, { new: true, session });
      await session.commitTransaction();
      return updated;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async delete<T>(model: Model<T>, query: any): Promise<void> {
    const session = await this.startSession();
    try {
      session.startTransaction();
      await model.deleteOne(query, { session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private async startSession(): Promise<ClientSession> {
    return this.instance.startSession();
  }
}

export default DatabaseCRUD;
