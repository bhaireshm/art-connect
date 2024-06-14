import {
  Model,
  ProjectionType,
  type AggregateOptions,
  type CreateOptions,
  type PipelineStage,
} from "mongoose";
import Database from "./database";

class DatabaseCRUD<T> extends Database {
  private model: Model<T>;

  /** Model Instance */
  m: Model<T>;

  constructor(model: Model<T>) {
    super();
    this.model = model;
    this.m = model;
  }

  public setModel(model: Model<T>) {
    this.model = model;
  }

  public async findAll(
    query: any,
    projection?: ProjectionType<T>,
  ): Promise<T[]> {
    this.connect();
    const result = await this.model.find(query, projection);
    this.disconnect();
    return result;
  }

  public async create(data: T, options?: CreateOptions): Promise<T[]> {
    this.connect();
    const result = await this.model.create([data], options);
    this.disconnect();
    return result;
  }

  public async update(id: string, data: Partial<T>) {
    this.connect();
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    this.disconnect();
    return result;
  }

  public async updateMany(data: Partial<T>[]) {
    this.connect();
    const result = await this.model.updateMany(data, { new: true }).exec();
    this.disconnect();
    return result;
  }

  public async delete(query: any) {
    this.connect();
    const result = await this.model.deleteOne(query);
    this.disconnect();
    return result;
  }

  public async findOne(query: any, projection?: ProjectionType<T>) {
    this.connect();
    const result = await this.model.findOne(query, projection).exec();
    this.disconnect();
    return result;
  }

  public async findById(id: string, projection?: ProjectionType<T>) {
    this.connect();
    const result = await this.model.findById(id, projection).exec();
    this.disconnect();
    return result;
  }

  public async filter(pipeline: PipelineStage[], options?: AggregateOptions) {
    this.connect();
    const result = await this.model.aggregate(pipeline, options);
    this.disconnect();
    return result;
  }

  public async count(query: any) {
    this.connect();
    const result = await this.model.countDocuments(query);
    this.disconnect();
    return result;
  }
}

export default DatabaseCRUD;
