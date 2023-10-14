export class CustomError extends Error {
  statusCode: number;
  message: string;
  logging: boolean;

  constructor(message: string, statusCode?: number, logging?: boolean) {
    super(message);

    this.message = message;
    this.statusCode = statusCode ?? 500;
    this.logging = logging ?? false;
  }
}
