import { STATUS_CODES } from "@/utils/constants";
import { NextResponse } from "next/server";

class ResponseHandler {
  data: any;
  error?: any;
  status?: number;
  message?: string;
  statusText?: string;
  response?: ResponseInit;

  constructor(
    data: any,
    error?: any,
    message?: string,
    status?: number,
    response?: ResponseInit,
  ) {
    this.data = data;
    this.error = error;
    if (status) {
      this.status = status;
      this.statusText = STATUS_CODES[status];
    }
    this.message = message ?? this.statusText;
    this.response = response;
  }

  static success(
    data: any,
    arg2?: string | number,
    arg3?: number | ResponseInit,
  ): NextResponse {
    let message = "";
    let status = 200;

    if (typeof arg2 === "string") {
      message = arg2;
      if (typeof arg3 === "number") status = arg3;
    } else if (typeof arg2 === "number") status = arg2;
    const headers = typeof arg3 === "object" ? arg3 : undefined;

    return new ResponseHandler(data, null, message, status, headers).json();
  }

  static error(
    error: any,
    arg2?: string | number,
    arg3?: number | ResponseInit,
  ): NextResponse {
    let message = "";
    let status = 500;

    if (typeof arg2 === "string") {
      message = arg2;
      if (typeof arg3 === "number") status = arg3;
    } else if (typeof arg2 === "number") status = arg2;
    const headers = typeof arg3 === "object" ? arg3 : undefined;

    return new ResponseHandler(null, error, message, status, headers).json();
  }

  json(): NextResponse {
    return NextResponse.json(
      {
        data: this.data,
        message: this.message,
        status: this.status,
        error: this.error,
      },
      { status: this.status, statusText: this.statusText, ...this.response },
    );
  }
}

export default ResponseHandler;
