import { NextResponse } from "next/server";

class ResponseHandler {
  data: any;
  error?: any;
  status?: number;
  statusText?: string;

  constructor(data: any, error?: any, status?: number, statusText?: string) {
    this.data = data;
    this.error = error;
    this.status = status;
    this.statusText = statusText;
  }

  static success(data: any, status?: number, statusText?: string) {
    return new ResponseHandler(data, null, status, statusText).json();
  }

  static error(error: any, status?: number, statusText?: string) {
    return new ResponseHandler(null, error, status, statusText).json();
  }

  json(): NextResponse {
    return NextResponse.json(
      { data: this.data, error: this.error, status: this.status },
      { status: this.status, statusText: this.statusText },
    );
  }
}

export default ResponseHandler;
