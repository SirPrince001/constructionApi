class Response {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}

class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  Response,
  ResponseError,
};
