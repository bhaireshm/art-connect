import { Error } from "mongoose";

export default class DatabaseError extends Error {
  public err: any;

  constructor(err: any) {
    super(err);
    this.err = err;
    this.constructError();
  }

  constructError() {
    if (this.err instanceof Error.ValidationError) {
      this.err = this.validationError(this.err);
    } else if (this.err instanceof Error.DocumentNotFoundError) {
      this.err = this.documentNotFoundError(this.err);
    } else this.err = this.format();
  }

  throw() {
    throw this.err;
  }

  format(err = this.err) {
    return {
      name: err.name,
      stack: err.stack,
      message: err.message,
      status: err.status ?? 500,
    };
  }

  validationError(err: Error.ValidationError) {
    this.err.name = Error.ValidationError.name;
    this.err.status = 403;
    // extract the error messages from errors
    return err;
  }

  documentNotFoundError(err: Error.DocumentNotFoundError) {
    this.err.status = 404;
    return err;
  }
}
