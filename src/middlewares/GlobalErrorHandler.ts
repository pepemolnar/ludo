import type { NextFunction, Request, Response } from 'express';
import { CustomError } from './CustomError';

export const globalErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  let message = 'Something went wrong!';
  let status = 500;

  if (error instanceof CustomError && error.logging) {
    message = error.message;
    status = error.statusCode;
  }

  console.error(error);
  response.status(status).send({ message });
};
