import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import { User } from "../Models/User.model.js";

class AuthMiddleware {
    static verifyJWT = asyncHandler(async (req, res, next) => {
        const token = req?.cookies?.accessToken;
        if (!token) return next(new ApiError(404, "token not found"));
        try {
            const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(decodeToken?._id);
            if (!user) return next(new ApiError(401, "Unauthorized Request."));

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    });
}

export default AuthMiddleware;