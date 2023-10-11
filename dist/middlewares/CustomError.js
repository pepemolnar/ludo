"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, logging) {
        super(message);
        this.message = message;
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
        this.logging = logging !== null && logging !== void 0 ? logging : false;
    }
}
exports.CustomError = CustomError;
