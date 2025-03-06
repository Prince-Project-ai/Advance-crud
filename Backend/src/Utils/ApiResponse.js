class ApiResponse {
    constructor(statusCode, message, data = null, success = true) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
    }
    static success(res, statusCode = 200, message = "success", data = null) {
        return res.status(statusCode).json(new ApiResponse(statusCode, message, data, true));
    }
}

export default ApiResponse;