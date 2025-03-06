import User from "../Models/User.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Middlewares/asyncHandler.js";

class userController {

    cookieOptions() {
        return {
            httpOnly: true,
            secure: true,
            // sameSite: "None",
            // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }
    }

    async generateAccessTokenAndRefreshToken(userId, next) {
        try {
            const user = await User.findById(userId);
            const newAccessToken = user.generateAccessToken;
            const newRefreshToken = user.generateRefreshToken;
            user.refreshToken = newRefreshToken;
            await user.save({ validateBeforeSave: false });
            return { newAccessToken, newRefreshToken };
        } catch (error) {
            next(error);
        }
    }

    static createUser = asyncHandler(async (req, res, next) => {
        const { userName, email, password } = req.body;
        if (!(userName && email && password)) return next(new ApiError(400, "Please Fill all the Fields."));
        const newUser = await User.create({
            userName,
            email,
            password,
        });
        if (!newUser) return next(new ApiError(404, "User Not Found"));
        ApiResponse.success(res, 201, "User Registration successfully.", newUser);
    });

    static signInUser = asyncHandler(async (req, res, next) => {
        const { userNameEmail, password, crmPassword } = req.body;
        if (!(userNameEmail && password)) return next(new ApiError(400, "Please Fill all the Fields."));
        if (password !== crmPassword) return next(new ApiError(401, "Password Does Not Same."));
        const isAuthenticated = await User.findOne({
            $or: [{ userName: userNameEmail }, { email: userNameEmail }],
        });
        if (!isAuthenticated) return next(new ApiError(401, "Invalid credentials."));
        const isValidPassword = await isAuthenticated.isPasswordCorrect(password);
        if (!isValidPassword) return next(new ApiError(401, "Invalid credentials."));
        const { newAccessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(isAuthenticated._id, next);
        ApiResponse.success(res, 200, "User Signed In successfully.", { isAuthenticated, newAccessToken, newRefreshToken }).cookie("accessToken", newAccessToken, cookieOptions).cookie("refreshToken", newRefreshToken, cookieOptions);
    });
}

export default userController;