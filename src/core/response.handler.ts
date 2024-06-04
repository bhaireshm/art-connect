class ResponseHandler {
  static status(status: number, statusText = "") {
    return { status, statusText };
  }
}

export default ResponseHandler;
