"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const CustomError_1 = require("./CustomError");
const globalErrorHandler = (error, request, response, next) => {
    let message = 'Something went wrong!';
    let status = 500;
    if (error instanceof CustomError_1.CustomError && error.logging) {
        message = error.message;
        status = error.statusCode;
    }
    console.error(error);
    response.status(status).send({ message });
};
exports.globalErrorHandler = globalErrorHandler;
