import { STATUS_CODES } from "@/utils/constants";
import { NextResponse } from "next/server";

class ResponseHandler {
  data: any;
  error?: any;
  status?: number;
  message?: string;
  statusText?: string;

  constructor(data: any, error?: any, message?: string, status?: number) {
    this.data = data;
    this.error = error;
    if (status) {
      this.status = status;
      this.statusText = STATUS_CODES[status];
    }
    this.message = message ?? this.statusText;
  }

  static success(data: any, arg2?: string | number, arg3?: number): NextResponse {
    let message = "";
    let status = 200;

    if (typeof arg2 === "string") {
      message = arg2;
      if (typeof arg3 === "number") status = arg3;
    } else if (typeof arg2 === "number") status = arg2;

    return new ResponseHandler(data, null, message, status).json();
  }

  static error(error: any, arg2?: string | number, arg3?: number): NextResponse {
    let message = "";
    let status = 500;

    if (typeof arg2 === "string") {
      message = arg2;
      if (typeof arg3 === "number") status = arg3;
    } else if (typeof arg2 === "number") status = arg2;

    return new ResponseHandler(null, error, message, status).json();
  }

  json(): NextResponse {
    return NextResponse.json(
      {
        data: this.data,
        message: this.message,
        status: this.status,
        error: this.error,
      },
      { status: this.status, statusText: this.statusText },
    );
  }
}

export default ResponseHandler;
