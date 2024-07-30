import {
  Model,
  ProjectionType,
  type AggregateOptions,
  type CreateOptions,
  type FilterQuery,
  type MongooseUpdateQueryOptions,
  type PipelineStage,
  type PopulateOptions,
  type QueryOptions,
  type UpdateQuery
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
  public async create(data: T | T[], options?: CreateOptions): Promise<T | T[]> { // this["m"]["schema"]["paths"]
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
  public async updateById(id: string, data: Partial<T>, options?: QueryOptions) {
    await this.connect();
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true, ...options })
      .exec();
    return result;
  }

  public async update(query: QueryOptions, data: Partial<T> | UpdateQuery<T>, options?: MongooseUpdateQueryOptions) {
    await this.connect();
    const result = await this.model
      .updateOne(query, data, { new: true, runValidators: true, ...options })
      .exec();
    return result;
  }

  /**
   * Updates multiple documents.
   *
   * @param data The data to use for updating the documents.
   * @returns The result of the update operation.
   */
  public async updateMany(filter: FilterQuery<T>, data: Partial<T>[], options?: MongooseUpdateQueryOptions) {
    await this.connect();
    const result = await this.model.updateMany(filter, data, { new: true, ...options }).exec();
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

  /**
   * Paginates documents based on the given query, page number, and limit.
   *
   * @param filter The query to filter documents.
   * @param page The page number to fetch.
   * @param limit The number of documents per page.
   * @param projection The projection to use for selecting fields.
   * @returns An object containing the paginated results and total document count.
   */
  public async paginate(
    filter: FilterQuery<T>,
    page: number = 1,
    limit: number = 10,
    projection?: ProjectionType<T>
  ): Promise<{ results: T[]; total: number }> {
    await this.connect();
    const skip = (page - 1) * limit;
    const results = await this.model.find(filter, projection).skip(skip).limit(limit).exec();
    const total = await this.model.countDocuments(filter).exec();
    return { results, total };
  }

  /**
   * Populates a document or documents with related data.
   *
   * @param query The query to use for finding the document(s).
   * @param path The path to the field to populate.
   * @param options The options to use for populating the field.
   * @returns The populated document(s).
   */
  public async populate(query: FilterQuery<T>, path: string | string[], options?: PopulateOptions): Promise<T | T[]> {
    await this.connect();
    // ! multiple paths not working check this
    const result = await this.model.find(query).populate(path, options).exec();
    return result;
  }
}

export default DBCrud;
