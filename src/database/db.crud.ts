import { Model, type AggregateOptions, type PipelineStage } from "mongoose";
import Database from "./database";

class DatabaseCRUD<T> extends Database {
  private model: Model<T>;

  constructor(model: Model<T>) {
    super();
    this.connect();
    this.model = model;
  }

  public setModel(model: Model<T>) {
    this.model = model;
  }

  public async read(query: any): Promise<T[]> {
    return this.model.find(query);
  }

  public async create(data: T): Promise<T[]> {
    // const session = await this.model.startSession();
    // try {
    // session.startTransaction();
    const created = await this.model.create([data]); //, { session });
    // await session.commitTransaction();
    return created;
    // } catch (error) {
    //   // await session.abortTransaction();
    //   throw error;
    // } finally {
    //   // await session.endSession();
    // }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // public async update(query: any, data: Partial<T>): Promise<T> {
  //   const session = await this.startSession();
  //   try {
  //     session.startTransaction();
  //     const updated = await this.model.findOneAndUpdate(query, data, { new: true, session });
  //     await session.commitTransaction();
  //     return updated;
  //   } catch (error) {
  //     await session.abortTransaction();
  //     throw error;
  //   } finally {
  //     await session.endSession();
  //   }
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async delete(query: any): Promise<void> {
    // const session = await this.model.startSession();
    // try {
    // session.startTransaction();
    await this.model.deleteOne(query); //, { session });
    // await session.commitTransaction();
    // } catch (error) {
    //   // await session.abortTransaction();
    //   throw error;
    // } finally {
    //   // await session.endSession();
    // }
  }

  public async findOne(query: any): Promise<T | null> {
    return this.model.findOne(query);
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async filter(pipeline: PipelineStage[], options?: AggregateOptions): Promise<T[]> {
    return this.model.aggregate(pipeline, options);
  }

  public async count(query: any): Promise<number> {
    return this.model.countDocuments(query);
  }
}

export default DatabaseCRUD;
