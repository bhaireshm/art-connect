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

  public async findAll(query: any): Promise<T[]> {
    return this.model.find(query);
  }

  public async create(data: T): Promise<T[]> {
    return this.model.create([data]);
  }

  public async update(query: any, data: Partial<T>) {
    return this.model.findOneAndUpdate(query, data, { new: true });
  }

  public async delete(query: any) {
    return this.model.deleteOne(query);
  }

  public async findOne(query: any) {
    return this.model.findOne(query);
  }

  public async findById(id: string) {
    return this.model.findById(id);
  }

  public async filter(pipeline: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options);
  }

  public async count(query: any) {
    return this.model.countDocuments(query);
  }
}

export default DatabaseCRUD;
