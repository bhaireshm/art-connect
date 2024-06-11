import {
  Model,
  type AggregateOptions,
  type CreateOptions,
  type PipelineStage,
  ProjectionType,
} from "mongoose";
import Database from "./database";

class DatabaseCRUD<T> extends Database {
  private model: Model<T>;

  /** Model Instance */
  m: Model<T>;

  constructor(model: Model<T>) {
    super();
    this.connect();
    this.model = model;
    this.m = model;
  }

  public setModel(model: Model<T>) {
    this.model = model;
  }

  public async findAll(query: any, projection?: ProjectionType<T>): Promise<T[]> {
    return this.model.find(query, projection);
  }

  public async create(data: T, options?: CreateOptions): Promise<T[]> {
    return this.model.create([data], options);
  }

  public async update(id: string, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  public async updateMany(data: Partial<T>[]) {
    return this.model.updateMany(data, { new: true }).exec();
  }

  public async delete(query: any) {
    return this.model.deleteOne(query);
  }

  public async findOne(query: any, projection?: ProjectionType<T>) {
    return this.model.findOne(query, projection).exec();
  }

  public async findById(id: string, projection?: ProjectionType<T>) {
    return this.model.findById(id, projection).exec();
  }

  public async filter(pipeline: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options);
  }

  public async count(query: any) {
    return this.model.countDocuments(query);
  }
}

export default DatabaseCRUD;
