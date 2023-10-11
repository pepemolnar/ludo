export class CustomError extends Error {
    statusCode;
    message;
    logging;
    constructor(message, statusCode, logging) {
        super(message);
        this.message = message;
        this.statusCode = statusCode ?? 500;
        this.logging = logging ?? false;
    }
}
