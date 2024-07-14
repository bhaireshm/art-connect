import { STATUS_TEXT } from "@/utils/constants";
import { Error } from "mongoose";

/**
 * Custom error class for database-related errors.
 *
 * Extends the built-in `Error` class and provides additional properties
 * for specific database error information.
 */
export default class DatabaseError extends Error {
  /**
   * HTTP status code associated with the error.
   */
  code: number;

  /**
   * Mongoose validation errors, if any.
   */
  errors?: any;

  /**
   * Hostname of the database server, if available.
   */
  host?: string;

  /**
   * Key that caused a duplicate key error, if any.
   */
  key?: string;

  /**
   * Creates a new instance of the DatabaseError class.
   *
   * @param err The original error object, if any.
   */
  constructor(err?: any) {
    let message = err ?? "Internal Server Error";
    let statusCode = STATUS_TEXT.INTERNAL_SERVER_ERROR;
    let errors;
    let host;
    let key;

    if (err instanceof Error.ValidationError) {
      message = "Validation failed";
      statusCode = STATUS_TEXT.BAD_REQUEST;
      errors = err.errors;
    } else if (err instanceof Error.DocumentNotFoundError) {
      message = "Document not found";
      statusCode = STATUS_TEXT.NOT_FOUND;
    } else if (err.name === "MongoServerError" && err.code === 11000) {
      message = "Duplicate key error";
      statusCode = STATUS_TEXT.CONFLICT;
      key = Object.keys(err.keyValue)[0];
    } else if (err instanceof Error.MongooseServerSelectionError) {
      message = "Connection failed";
      statusCode = STATUS_TEXT.INTERNAL_SERVER_ERROR;
    }

    super(message);
    this.name = "DatabaseError";
    this.code = statusCode;
    this.errors = errors;
    this.host = host;
    this.key = key;
    Error.captureStackTrace(this, this.constructor);
  }
}
