export default class ApiError extends Error {
    constructor(statusCode, message = "SOMETHING WENT WRONG", errors = [], stack) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}