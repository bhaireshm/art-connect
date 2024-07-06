import {
  Model,
  ProjectionType,
  type AggregateOptions,
  type CreateOptions,
  type PipelineStage
} from "mongoose";
import Database from "./database";

/**
 * A class that provides CRUD operations for a given Mongoose model.
 *
 * @template T The type of the Mongoose model.
 */
class DBCrud<T> extends Database {
  private model: Model<T>;

  /** Model Instance */
  m: Model<T>;

  /**
   * Creates a new instance of the DBCrud class.
   * 
   * @param model The Mongoose model to use for CRUD operations.
   */
  constructor(model: Model<T>) {
    super();
    this.model = model;
    this.m = model;
  }

  /**
   * Sets the Mongoose model to use for CRUD operations.
   *
   * @param model The Mongoose model to use for CRUD operations.
   */
  public setModel(model: Model<T>) {
    this.model = model;
  }

  /**
   * Finds all documents that match the given query.
   *
   * @param query The query to use for finding documents.
   * @param projection The projection to use for selecting fields.
   * @returns An array of documents that match the query.
   */
  public async findAll(
    query: any,
    projection?: ProjectionType<T>,
  ): Promise<T[]> {
    await this.connect();
    const result = await this.model.find(query, projection);
    return result;
  }

  /**
   * Creates a new document or multiple documents.
   *
   * @param data The data to use for creating the document(s).
   * @param options The options to use for creating the document(s).
   * @returns The created document(s).
   */
  public async create(data: T, options?: CreateOptions): Promise<T | T[]> { // this["m"]["schema"]["paths"]
    await this.connect();
    const isMulti = Array.isArray(data);
    const result = await this.model.create(isMulti ? data : [data], options);
    return isMulti ? result : result[0];
  }

  /**
   * Updates a document by its ID.
   *
   * @param id The ID of the document to update.
   * @param data The data to use for updating the document.
   * @returns The updated document.
   */
  public async update(id: string, data: Partial<T>) {
    await this.connect();
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return result;
  }

  /**
   * Updates multiple documents.
   *
   * @param data The data to use for updating the documents.
   * @returns The result of the update operation.
   */
  public async updateMany(data: Partial<T>[]) {
    await this.connect();
    const result = await this.model.updateMany(data, { new: true }).exec();
    return result;
  }

  /**
   * Deletes a document that matches the given query.
   *
   * @param query The query to use for deleting the document.
   * @returns The result of the delete operation.
   */
  public async delete(query: any) {
    await this.connect();
    const result = await this.model.deleteOne(query);
    return result;
  }

  /**
   * Finds a single document that matches the given query.
   *
   * @param query The query to use for finding the document.
   * @param projection The projection to use for selecting fields.
   * @returns The document that matches the query.
   */
  public async findOne(query: any, projection?: ProjectionType<T>) {
    await this.connect();
    const result = await this.model.findOne(query, projection).exec();
    return result;
  }

  /**
   * Finds a document by its ID.
   *
   * @param id The ID of the document to find.
   * @param projection The projection to use for selecting fields.
   * @returns The document with the given ID.
   */
  public async findById(id: string, projection?: ProjectionType<T>) {
    await this.connect();
    const result = await this.model.findById(id, projection).exec();
    return result;
  }

  /**
   * Filters documents using an aggregation pipeline.
   *
   * @param pipeline The aggregation pipeline to use for filtering documents.
   * @param options The options to use for the aggregation operation.
   * @returns The result of the aggregation operation.
   */
  public async filter(pipeline: PipelineStage[], options?: AggregateOptions) {
    await this.connect();
    const result = await this.model.aggregate(pipeline, options);
    return result;
  }

  /**
   * Counts the number of documents that match the given query.
   *
   * @param query The query to use for counting documents.
   * @returns The number of documents that match the query.
   */
  public async count(query: any) {
    await this.connect();
    const result = await this.model.countDocuments(query);
    return result;
  }
}

export default DBCrud;
