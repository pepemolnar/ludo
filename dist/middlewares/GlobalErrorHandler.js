import { CustomError } from './CustomError';
export const globalErrorHandler = (error, request, response, next) => {
    let message = 'Something went wrong!';
    let status = 500;
    if (error instanceof CustomError && error.logging) {
        message = error.message;
        status = error.statusCode;
    }
    console.error(error);
    response.status(status).send({ message });
};
