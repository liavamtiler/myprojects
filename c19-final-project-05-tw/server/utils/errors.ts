import type { Request, Response, NextFunction } from "express";

enum ErrorType {
  AUTH = "auth",
  GENERAL = "general",
  INTERNAL_ERROR = "internal-error",
}

const ERR_CODE = Object.freeze({
  INTERNAL_SERVER_ERROR: 999,
  INVALID_PARAMS: 100,
  INVALID_TOKEN: 200,
  INVALID_LOGIN: 201,
});

export class ApplicationError extends Error {
  public code: number;
  public type: ErrorType;

  constructor(code: number, type: ErrorType, message: string) {
    super(message);
    this.code = code;
    this.type = type;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

export class InvalidParamsError extends ApplicationError {
  constructor() {
    super(ERR_CODE.INVALID_PARAMS, ErrorType.GENERAL, "invalid parameters");
    Object.setPrototypeOf(this, InvalidParamsError.prototype);
  }
}

export class InvalidLoginError extends ApplicationError {
  constructor() {
    super(ERR_CODE.INVALID_LOGIN, ErrorType.AUTH, "wrong username or password");
    Object.setPrototypeOf(this, InvalidAuthTokenError.prototype);
  }
}

export class InvalidAuthTokenError extends ApplicationError {
  constructor() {
    super(ERR_CODE.INVALID_TOKEN, ErrorType.AUTH, "permission denied");
    Object.setPrototypeOf(this, InvalidAuthTokenError.prototype);
  }
}

export class InternalServerError extends ApplicationError {
  constructor() {
    super(ERR_CODE.INTERNAL_SERVER_ERROR, ErrorType.INTERNAL_ERROR, "internal server error");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export const errorHandlerMiddleware = (
  err: ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number;
  switch (err.type) {
    case ErrorType.INTERNAL_ERROR:
      statusCode = 500;
      break;
    case ErrorType.AUTH:
      statusCode = 401;
      break;
    default:
      statusCode = 400;
  }

  res.status(statusCode).json({ errCode: err.code, message: err.message });
};
