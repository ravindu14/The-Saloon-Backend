import HttpException from "../shared/exceptions/HttpException";

export class DataMissingException extends HttpException {
  constructor() {
    super(400, `Missing data`, false);
  }
}

export class AuthenticationErrorException extends HttpException {
  constructor() {
    super(400, `Incorrect Username or Password`, false);
  }
}
