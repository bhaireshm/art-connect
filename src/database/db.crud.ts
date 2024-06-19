import {
  Model,
  ProjectionType,
  type AggregateOptions,
  type CreateOptions,
  type PipelineStage,
} from "mongoose";
import Database from "./database";

class DBCrud<T> extends Database {
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
    await this.connect();
    const result = await this.model.find(query, projection);
    return result;
  }

  public async create(data: T, options?: CreateOptions): Promise<T[]> {
    await this.connect();
    const result = await this.model.create([data], options);
    return result;
  }

  public async update(id: string, data: Partial<T>) {
    await this.connect();
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return result;
  }

  public async updateMany(data: Partial<T>[]) {
    await this.connect();
    const result = await this.model.updateMany(data, { new: true }).exec();
    return result;
  }

  public async delete(query: any) {
    await this.connect();
    const result = await this.model.deleteOne(query);
    return result;
  }

  public async findOne(query: any, projection?: ProjectionType<T>) {
    await this.connect();
    const result = await this.model.findOne(query, projection).exec();
    return result;
  }

  public async findById(id: string, projection?: ProjectionType<T>) {
    await this.connect();
    const result = await this.model.findById(id, projection).exec();
    return result;
  }

  public async filter(pipeline: PipelineStage[], options?: AggregateOptions) {
    await this.connect();
    const result = await this.model.aggregate(pipeline, options);
    return result;
  }

  public async count(query: any) {
    await this.connect();
    const result = await this.model.countDocuments(query);
    return result;
  }
}

export default DBCrud;
